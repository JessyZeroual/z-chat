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

const createMessage = (message, channelId) => {
  pool.query(
    'INSERT INTO message (text, channel_id, user_id) VALUES($1, $2, $3)',
    [message, channelId, 1]
  );
};

const getMessagesList = async channelId => {
  const messages = await pool.query(
    `SELECT * FROM message WHERE channel_id=${channelId} `
  );
  return messages.rows;
};

const getAllUsers = async () => {
  const users = await pool.query('SELECT * FROM app_user');
  return users.rows;
};

const createUser = async (username, email, password) => {
  try {
    await pool.query(
      `INSERT INTO app_user (name, email, password) VALUES ($1, crypt($2, gen_salt('bf')), $3)`,
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

module.exports = {
  getAllChannels,
  getChannelByName,
  createChannel,
  createMessage,
  getMessagesList,
  getAllUsers,
  createUser,
};
