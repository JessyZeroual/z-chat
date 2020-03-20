const pg = require('pg');

const databaseUrl = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: databaseUrl,
});

const signup = async (username, email, password) => {
  try {
    const result = await pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, crypt($3, gen_salt('bf')))`,
      [username, email, password]
    );
    return result.rows[0];
  } catch (error) {
    // Postgres UNIQUE VIOLATION
    if (error.code === '23505') {
      throw new Error('Email is already taken.');
    }
    throw new Error(error.message);
  }
};

const signupWithGoogle = async (username, email, password, googleId) => {
  try {
    const result = await pool.query(
      `INSERT INTO users (username, email, password, google_id) VALUES ($1, $2, crypt($3, gen_salt('bf')), $4) RETURNING id `,
      [username, email, password, googleId]
    );
    return result.rows[0];
  } catch (error) {
    // Postgres UNIQUE VIOLATION
    if (error.code === '23505') {
      throw new Error('Email is already taken.');
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

const existsGoogleId = async googleId => {
  const result = await pool.query(
    `SELECT id 
    FROM users
    WHERE google_id = $1`,
    [googleId]
  );

  return result.rows[0];
};

const addGoogleIdToUser = async (googleId, userId) => {
  await pool.query(
    `UPDATE users
    SET google_id = $1
    WHERE id = $2`,
    [googleId, userId]
  );
};

const getUserByEmail = async email => {
  try {
    const result = await pool.query(
      `SELECT id, email, google_id 
      FROM users
      WHERE email = $1`,
      [email]
    );
    return result.rows[0];
  } catch (error) {
    // Postgres UNIQUE VIOLATION
    if (error.code === '23505') {
      throw new Error('Email is already exists.');
    }
    throw new Error(error.message);
  }
};

module.exports = {
  signup,
  signupWithGoogle,
  addGoogleIdToUser,
  createSession,
  deleteSession,
  existsGoogleId,
  getUserByEmail,
};
