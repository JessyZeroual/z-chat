const { OAuth2Client } = require('google-auth-library');
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
  const { tokenId } = req.body;

  const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);

  const verify = async () => {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID_GOOGLE,
    });
    const payload = ticket.getPayload();
    const { email, sub: googleId, given_name: username, exp } = payload;

    const result = await dataAccess.existsGoogleId(googleId);
    if (result) {
      const sessionId = await dataAccess.createSession(result.id);
      res.cookie('sessionId', sessionId, { maxAge: exp, httpOnly: true });
      return res.sendStatus(200);
    }

    const user = await dataAccess.getUserByEmail(email);
    if (user) {
      if (!user.googleId) {
        await dataAccess.addGoogleIdToUser(googleId, user.id);
        const sessionId = await dataAccess.createSession(user.id);
        res.cookie('sessionId', sessionId, {
          maxAge: exp,
          httpOnly: true,
        });
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
    res.cookie('sessionId', sessionId, { maxAge: exp, httpOnly: true });
    return res.sendStatus(201);
  };
  verify().catch(console.error);
};

module.exports = {
  signin,
  logout,
  signup,
  signupWithGoogle,
};
