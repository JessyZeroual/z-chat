const pg = require('pg');

const databaseUrl = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: databaseUrl,
});

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

module.exports = {
  createMessage,
  getMessagesList,
};
