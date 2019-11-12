const pg = require('pg');
require('dotenv').config();
const databaseUrl = process.env.DATABASE_URL;

// Pool qui provient de postGres permet de requeter sur la base
// et prend en parametre une connectionString qu'on defini dans le .env
const pool = new pg.Pool({
  connectionString: databaseUrl,
});

// Requête sur la base de donnée

const getAllChannels = async () => {
  // different exemple d'utilisation https://node-postgres.com/api/pool
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

module.exports = {
  getAllChannels,
  getChannelByName,
  createChannel,
  createMessage,
  getMessagesList,
};
