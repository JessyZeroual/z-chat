const pg = require('pg');

const databaseUrl = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: databaseUrl,
});

const signup = async (username, email, password) => {
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
    throw new Error(error.message);
  }
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

module.exports = {
  signup,
  createSession,
  deleteSession,
};
