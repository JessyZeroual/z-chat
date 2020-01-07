const pg = require('pg');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: databaseUrl,
});

const getAllChannels = async () => {
  const channels = await pool.query('SELECT * FROM channel ');
  return channels.rows;
};

const getChannelByName = async name => {
  const channel = await pool.query('SELECT * FROM channel WHERE name = $1', [
    name,
  ]);

  return channel.rows[0];
};

const createChannel = name => {
  pool.query('INSERT INTO channel (name) VALUES ($1)', [name]);
};

const createMessage = (message, userId, channelId) => {
  pool.query(
    'INSERT INTO message (text, user_id, channel_id) VALUES($1, $2, $3)',
    [message, userId, channelId]
  );
};

const getMessagesList = async channelId => {
  const messages = await pool.query(
    `SELECT * FROM message WHERE channel_id=${channelId} `
  );
  return messages.rows;
};

const getAllUsers = async () => {
  const users = await pool.query('SELECT * FROM users');
  return users.rows;
};

const createUser = async (username, email, password) => {
  try {
    await pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, crypt($3, gen_salt('bf')))`,
      [username, email, password]
    );
  } catch (error) {
    // Postgres UNIQUE VIOLATION
    if (error.code === '23505') {
      throw new Error('Username is already taken.');
    }
    console.log(error);
    throw new Error(error.message);
  }
};

const findUserId = async (email, password) => {
  const result = await pool.query(
    'SELECT id FROM users WHERE email = $1 AND password = crypt($2, password)',
    [email, password]
  );
  return result.rows[0].id;
};

const createSession = async userId => {
  const result = await pool.query(
    'INSERT INTO session (user_id) VALUES ($1) RETURNING session_id',
    [userId]
  );
  return result.rows[0].session_id;
};

const deleteSession = async sessionId => {
  await pool.query('DELETE FROM session WHERE session_id = $1', [sessionId]);
};

const getUserFromSessionId = async sessionId => {
  const result = await pool.query(
    `
    SELECT users.id AS id, username, email FROM users
      JOIN session
      ON session.user_id = users.id
    WHERE session.session_id = $1
    `,
    [sessionId]
  );
  const user = result.rows[0];
  if (!user) {
    throw new Error('User is not authenticated.');
  }
  return user;
};

module.exports = {
  getAllChannels,
  getChannelByName,
  createChannel,
  createMessage,
  getMessagesList,
  getAllUsers,
  createUser,
  findUserId,
  createSession,
  deleteSession,
  getUserFromSessionId,
};
