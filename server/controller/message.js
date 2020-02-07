const dataAccess = require('../dataAccess');

const createMessage = async (req, res) => {
  const { message, userId, channelId } = req.body;
  await dataAccess.createMessage(message, userId, channelId);

  return res.status(201).send(`message ajouté :)`);
};

const getMessagesByChannelId = async (req, res) => {
  const { channelId, limit, offset } = req.params;
  const messages = await dataAccess.getMessagesByChannelId(
    channelId,
    limit,
    offset
  );

  return res.status(200).json({ messages });
};

module.exports = {
  createMessage,
  getMessagesByChannelId,
};
