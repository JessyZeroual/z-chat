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

const signin = async req => {
  const { email, password } = req.body;

  const users = await dataAccess.getAllUsers();

  if (email && password) {
    const user = users.find(
      appUser => appUser.email === email && appUser.password === password // TODO: hash
    );

    if (user) {
      req.session.userId = user.id;
      return user;
    }
  }

  return 'error';
};

module.exports = {
  createChannelAndGetId,
  validateUser,
  signin,
};
