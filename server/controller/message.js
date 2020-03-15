const dataAccess = require('../dataAccess');
const { EVENTS, eventEmitter } = require('../events');

const createMessage = async (req, res) => {
  const { message, userId, channelId } = req.body;
  const { id } = await dataAccess.createMessage(message, userId, channelId);
  const result = await dataAccess.getMessage(id);

  eventEmitter.emit(EVENTS.MESSAGE_CREATED, result);
  return res.status(201).send(result);
};

const getMessagesByChannelId = async (req, res) => {
  const { channelId, limit, offset } = req.params;
  const messages = await dataAccess.getMessagesByChannelId(
    channelId,
    limit,
    offset
  );

  const nextMessages = await dataAccess.getMessagesByChannelId(
    channelId,
    limit,
    Number(offset) + Number(limit)
  );

  return res.status(200).json({ messages, nextMessages });
};

module.exports = {
  createMessage,
  getMessagesByChannelId,
};
