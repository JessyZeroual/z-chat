const dataAccess = require('../dataAccess');

const getCleanPassword = password => {
  if (password.length >= 8) {
    return password;
  }
  throw new Error('Password must contain at least 8 characters.');
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const userId = await dataAccess.getUserById(email, password);
  const sessionId = await dataAccess.createSession(userId);
  res.cookie('sessionId', sessionId, { maxAge: 999900000, httpOnly: true });
  return res.sendStatus(201);
};

const logout = async (req, res) => {
  const { sessionId } = await req.cookies;
  await dataAccess.deleteSession(sessionId);
  return res.sendStatus(200);
};

const signup = async (req, res) => {
  try {
    const { username, email } = req.body;
    const password = getCleanPassword(req.body.password);
    await dataAccess.signup(username, email, password);
  } catch (error) {
    return res.status(400).send({ errorMessage: error.message });
  }
  return res.sendStatus(201);
};

module.exports = {
  signin,
  logout,
  signup,
};
