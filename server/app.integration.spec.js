const { when } = require('jest-when');
const superTest = require('supertest');

jest.mock('./dataAccess');
const dataAccess = require('./dataAccess');
const app = require('./app');

const agent = superTest.agent(app);

describe('app', () => {
  describe('GET /api/channels', () => {
    const channels = [
      { id: '123', name: 'general' },
      { id: '234', name: 'random' },
    ];

    beforeEach(() => {
      dataAccess.getUserFromSessionId = jest.fn();
      when(dataAccess.getUserFromSessionId)
        .calledWith('a42be28b-0fb7-4d7f-9a49-7111defabcfd')
        .mockReturnValue({
          id: 1,
          email: 'jess@gmail.com',
          username: 'Jessy',
        });
      dataAccess.getAllChannels = jest.fn(() => channels);
    });

    describe('when user is authenticated', () => {
      it('responds with channel list', async () => {
        const response = await agent
          .get('/api/channels')
          .set('Cookie', 'sessionId=a42be28b-0fb7-4d7f-9a49-7111defabcfd');
        expect(response.status).toEqual(200);
        expect(JSON.parse(response.text)).toEqual({ channels });
      });
    });

    describe('when user is not authenticated', () => {
      it('responds with status 401', async () => {
        const response = await agent.get('/api/channels');
        expect(response.status).toEqual(401);
      });
    });
  });
});
