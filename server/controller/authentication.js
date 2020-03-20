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

const signupWithGoogle = async (req, res) => {
  const { googleId, email, username } = req.body;

  const result = await dataAccess.existsGoogleId(googleId);
  if (result) {
    const sessionId = await dataAccess.createSession(result.id);
    res.cookie('sessionId', sessionId, { maxAge: 999900000, httpOnly: true });
    return res.sendStatus(200);
  }

  const user = await dataAccess.getUserByEmail(email);
  if (user) {
    if (!user.googleId) {
      await dataAccess.addGoogleIdToUser(googleId, user.id);
      const sessionId = await dataAccess.createSession(user.id);
      res.cookie('sessionId', sessionId, { maxAge: 999900000, httpOnly: true });
      return res.sendStatus(200);
    }
  }

  const { id } = await dataAccess.signupWithGoogle(
    username,
    email,
    '',
    googleId
  );

  const sessionId = await dataAccess.createSession(id);
  res.cookie('sessionId', sessionId, { maxAge: 999900000, httpOnly: true });
  return res.sendStatus(201);
};

module.exports = {
  signin,
  logout,
  signup,
  signupWithGoogle,
};
