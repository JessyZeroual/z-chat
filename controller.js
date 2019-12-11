const dataAccess = require('./data-access');
const services = require('./service');

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
  const { message, channelId } = req.body;
  await dataAccess.createMessage(message, channelId);

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

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await services.validateUser(name, email, password);

  await dataAccess.createUser(user);

  return res.status(201).json(`${user.name} added`);
};

const signin = async (req, res) => {
  const user = await services.signin(req);
  console.log(req.session);
  return user;
};

module.exports = {
  getAllChannels,
  createChannel,
  createMessage,
  getMessagesByChannelId,
  getAllUsers,
  createUser,
  signin,
};
