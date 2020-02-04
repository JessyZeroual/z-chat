const dataAccess = require('../dataAccess');
const services = require('../service');

const getAllChannels = async (req, res) => {
  const channels = await dataAccess.getAllChannels();
  return res.status(200).json({ channels });
};

const getChannelById = async (req, res) => {
  const { channelId } = req.params;
  const channel = await dataAccess.getChannelById(channelId);
  return res.status(200).json({ channel });
};

const createChannel = async (req, res) => {
  const { name } = req.body;

  const channelId = await services.createChannelAndGetId(name);

  return res.status(201).send(`Channel added with ID: ${channelId}`);
};

module.exports = {
  getAllChannels,
  getChannelById,
  createChannel,
};
