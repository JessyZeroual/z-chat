const pg = require('pg');

const databaseUrl = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: databaseUrl,
});

const createMessage = async (text, userId, channelId, extraInfo) => {
  const result = await pool.query(
    'INSERT INTO message (text, user_id, channel_id, extra_info) VALUES($1, $2, $3, $4)  RETURNING *',
    [text, userId, channelId, extraInfo]
  );
  return result.rows[0];
};

const getMessage = async messageId => {
  const result = await pool.query(
    `
    SELECT message.id, message.text, message.created_at, message.channel_id, users.username, users.id as user_id, extra_info
    FROM message
    JOIN users
    ON message.user_id = users.id
    WHERE message.id = $1
  `,
    [messageId]
  );
  return result.rows[0];
};

const getMessagesByChannelId = async (channelId, limit, offset) => {
  const messages = await pool.query(
    `SELECT message.id, message.text, message.created_at, message.channel_id, users.username, users.id as user_id, extra_info
              FROM message
              JOIN users
              ON message.user_id = users.id
              WHERE channel_id=($1) 
              ORDER BY message.created_At DESC 
              LIMIT ($2) 
              OFFSET ($3) `,
    [channelId, limit, offset]
  );

  return messages.rows;
};

const deleteMessage = async id => {
  await pool.query(`DELETE FROM message WHERE id = $1`, [id]);
};

module.exports = {
  createMessage,
  getMessagesByChannelId,
  getMessage,
  deleteMessage,
};
