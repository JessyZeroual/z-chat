const dataAccess = require('../dataAccess/data-access');
const services = require('../service/service');

const getAllChannels = async (req, res) => {
  const channels = await dataAccess.getAllChannels();
  return res.status(200).json({ channels });
};

const createChannel = async (req, res) => {
  const { name } = req.body;

  const channelId = await services.createChannelAndGetId(name);

  return res.status(201).send(`Channel added with ID: ${channelId}`);
};

const createMessage = async (req, res) => {
  const { message, userId, channelId } = req.body;
  await dataAccess.createMessage(message, userId, channelId);

  return res.status(201).send(`message ajouté :)`);
};

const getMessagesByChannelId = async (req, res) => {
  const messages = await dataAccess.getMessagesList(req.params.channelId);

  return res.status(200).json({ messages });
};

const getAllUsers = async (req, res) => {
  const users = await dataAccess.getAllUsers();
  return res.status(200).json({ users });
};

const getCleanPassword = password => {
  if (password.length >= 8) {
    return password;
  }
  throw new Error('Password must contain at least 8 characters.');
};

const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const password = getCleanPassword(req.body.password);
    await dataAccess.createUser(username, email, password);
  } catch (error) {
    return res.status(400).send({ errorMessage: error.message });
  }
  return res.sendStatus(201);
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const userId = await dataAccess.findUserId(email, password);
  const sessionId = await dataAccess.createSession(userId);
  res.cookie('sessionId', sessionId, { maxAge: 999900000, httpOnly: true });
  return res.sendStatus(201);
};

const logout = async (req, res) => {
  const { sessionId } = await req.cookies;
  await dataAccess.deleteSession(sessionId);
  return res.sendStatus(200);
};

const getCurrentUser = async (req, res) => {
  const { user } = req;
  if (user) {
    return res.status(200).send(user);
  }
  return res.sendStatus(401);
};

module.exports = {
  getAllChannels,
  createChannel,
  createMessage,
  getMessagesByChannelId,
  getAllUsers,
  createUser,
  signin,
  logout,
  getCurrentUser,
};
