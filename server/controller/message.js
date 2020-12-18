const dataAccess = require('../dataAccess');
const services = require('../service');
const { EVENTS, eventEmitter } = require('../events');

const createMessage = async (req, res) => {
  const { text, channelId } = req.body;
  const { user } = req;

  if (text.trim().length < 1) {
    return res
      .status(400)
      .send({ errorMessage: 'the message must contain 1 character minimum' });
  }

  const extraInfo = JSON.stringify(
    await services.getExtraInfoFromMessage(text)
  );

  const { id } = await dataAccess.createMessage(
    text,
    user.id,
    channelId,
    extraInfo
  );

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

const getMessagesNotSeen = async (req, res) => {
  const { user } = req;
  const notificationByChannel = await dataAccess.getMessagesNotSeen(user.id);
  return res.status(200).json({ notificationByChannel });
};

const hasSeenMessage = async (req, res) => {
  const { user } = req;
  const { messages } = req.body;

  await Promise.all(
    messages.map(async message => {
      await dataAccess.hasSeenMessage(user.id, message.id);
    })
  );

  return res.sendStatus(200);
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const message = await dataAccess.getMessage(id);

  if (!message) return res.sendStatus(404);
  if (message.user_id !== user.id) return res.sendStatus(403);

  await dataAccess.deleteMessage(id);
  return res.sendStatus(200);
};

module.exports = {
  createMessage,
  getMessagesByChannelId,
  getMessagesNotSeen,
  hasSeenMessage,
  deleteMessage,
};
