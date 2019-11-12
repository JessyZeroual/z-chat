const dataAccess = require('./data-access');

const createChannelAndGetId = async name => {
  // La fonction qui crée le channel
  await dataAccess.createChannel(name);
  // On initialise une constante qui reçois le channel qui viens d'être crée
  const channel = await dataAccess.getChannelByName(name);

  return channel.id;
};

module.exports = {
  createChannelAndGetId,
};
