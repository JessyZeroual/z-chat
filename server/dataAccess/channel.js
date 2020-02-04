const pg = require('pg');

const databaseUrl = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: databaseUrl,
});

const getAllChannels = async () => {
  const channels = await pool.query('SELECT * FROM channel ');
  return channels.rows;
};

const getChannelById = async channelId => {
  const channel = await pool.query('SELECT * FROM channel WHERE id = $1', [
    channelId,
  ]);

  return channel.rows[0];
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

module.exports = {
  getAllChannels,
  getChannelById,
  getChannelByName,
  createChannel,
};
