const dataAccess = require('../dataAccess');

const createChannelAndGetId = async name => {
  await dataAccess.createChannel(name);
  const channel = await dataAccess.getChannelByName(name);

  return channel.id;
};

module.exports = {
  createChannelAndGetId,
};
