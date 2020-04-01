const pg = require('pg');
const util = require('util');
const request = require('supertest');
// Use exec as a promise to be able to await it
const exec = util.promisify(require('child_process').exec);

const app = require('./app');
const dataAccess = require('./dataAccess');

const agent = request.agent(app);

const resetDatabase = async () => {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
  await pool.query(`
    DROP SCHEMA IF EXISTS public CASCADE;
    CREATE SCHEMA public;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
  `);
};

const migrateDatabase = async () => {
  const { stdout, stderr } = await exec('npm run migrate');
  // eslint-disable-next-line no-console
  console.log('migrateDatabase--stdout:', stdout);
  // eslint-disable-next-line no-console
  console.log('migrateDatabase--stderr:', stderr);
};

describe('App', () => {
  let user1;
  let user1SessionId;
  let user1Message;

  let user2;
  let user2SessionId;

  beforeEach(async () => {
    await resetDatabase();
    await migrateDatabase();
    await dataAccess.signup('user1', 'user1@gmail.com', 'myPassword');
    await dataAccess.signup('user2', 'user2@gmail.com', 'myPassword');
    user1 = await dataAccess.getUserByEmail('user1@gmail.com');
    user2 = await dataAccess.getUserByEmail('user2@gmail.com');

    user1SessionId = await dataAccess.createSession(user1.id);
    user1Message = await dataAccess.createMessage('myMessage', user1.id, 1);

    user2SessionId = await dataAccess.createSession(user2.id);
  });

  describe('DELETE /api/messages', () => {
    describe('when the user owns the message', () => {
      it('responds with 200 and deletes the message', async done => {
        const response = await agent
          .delete(`/api/messages/${user1Message.id}`)
          .set('Cookie', `sessionId=${user1SessionId}`)
          .send({ userId: user1.id });

        expect(response.status).toEqual(200);
        expect(await dataAccess.getMessage(user1Message.id)).toEqual(undefined);
        done();
      });
    });

    describe('when the user does not own the message', () => {
      it('responds with 403 and does not delete the message', async done => {
        const response = await agent
          .delete(`/api/messages/${user1Message.id}`)
          .set('Cookie', `sessionId=${user2SessionId}`)
          .send({ userId: user2.id });

        expect(response.status).toEqual(403);

        const message = await dataAccess.getMessage(user1Message.id);
        expect(message.id).toEqual(user1Message.id);
        done();
      });
    });

    describe('when the message does not exist', () => {
      it('responds with 404', async done => {
        const fictionalMessage = {
          channel_id: 1,
          created_at: '2020-04-01T17:13:23.336Z',
          id: 999999999,
          text: 'Fictional message',
          user_id: user2.id,
          username: user2.username,
        };

        const response = await agent
          .delete(`/api/messages/${fictionalMessage.id}`)
          .set('Cookie', `sessionId=${user2SessionId}`)
          .send({ userId: user2.id });

        expect(response.status).toEqual(404);
        expect(await dataAccess.getMessage(fictionalMessage.id)).toEqual(
          undefined
        );
        done();
      });
    });
  });
});
