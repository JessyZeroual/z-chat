const dataAccess = require('./data-access');

const createChannelAndGetId = async name => {
  await dataAccess.createChannel(name);
  const channel = await dataAccess.getChannelByName(name);

  return channel.id;
};

const validateUser = async (name, email, password) => {
  const users = await dataAccess.getAllUsers();

  // TODO: validation
  const exists = users.some(user => user.email === email);

  if (!exists) {
    const user = {
      name,
      email,
      password, // TODO: hash
    };
    return user;
  }

  return 'error';
};

module.exports = {
  createChannelAndGetId,
  validateUser,
};
