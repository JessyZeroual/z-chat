const pg = require('pg');

const databaseUrl = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: databaseUrl,
});

const getAllUsers = async () => {
  const users = await pool.query('SELECT * FROM users');
  return users.rows;
};

const getVerifiedUserId = async (email, password) => {
  const result = await pool.query(
    'SELECT id FROM users WHERE email = $1 AND password = crypt($2, password)',
    [email, password]
  );
  return result.rows[0].id;
};

const getUserFromSessionId = async sessionId => {
  const result = await pool.query(
    `
    SELECT users.id AS id, username, email, avatar_url FROM users
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

const updateAvatarUser = async (avatarUrl, userId) => {
  await pool.query(
    `UPDATE users
     SET avatar_url = $1
     WHERE id = $2`,
    [avatarUrl, userId]
  );
};

const updateUser = async (username, userId) => {
  await pool.query(
    `UPDATE users
     SET username = $1
     WHERE id = $2`,
    [username, userId]
  );
};

module.exports = {
  getAllUsers,
  getVerifiedUserId,
  getUserFromSessionId,
  updateAvatarUser,
  updateUser,
};
