const dataAccess = require('./data-access');
const services = require('./service');

// req => request ( arguments venant du client )
// res => response ( reponse venant de la base de donnée )

// Récupere les channels
const getAllChannels = async (req, res) => {
  // On retourne dans le await le dataAccess qui lui fera la requête sur la base
  const channels = await dataAccess.getAllChannels();
  return res.status(200).json({ channels });
};

// Crée un channel
const createChannel = async (req, res) => {
  // Récuperation du name provenant du client ( webapp ) avec req.body depuis un POST
  const { name } = req.body;

  // la function permet de crée un chanel et de recupérer son id
  const channelId = await services.createChannelAndGetId(name);

  return res.status(201).send(`Channel added with ID: ${channelId}`);
};

// Ajouter un message
const createMessage = async (req, res) => {
  // Récuperation du message et channelId provenant du client ( webapp ) avec req.body
  const { message, channelId } = req.body;
  await dataAccess.createMessage(message, channelId);

  return res.status(201).send(`message ajouté :)`);
};

// Récupere les messages d'un channel
const getMessagesByChannelId = async (req, res) => {
  // la function permet de crée un chanel et de recupérer son id
  const messages = await dataAccess.getMessagesList(req.params.channelId);

  return res.status(200).json({ messages });
};

module.exports = {
  getAllChannels,
  createChannel,
  createMessage,
  getMessagesByChannelId,
};
