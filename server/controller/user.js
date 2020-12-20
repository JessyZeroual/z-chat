const dataAccess = require('../dataAccess');

const getAllUsers = async (req, res) => {
  const users = await dataAccess.getAllUsers();
  return res.status(200).json({ users });
};

const getCurrentUser = async (req, res) => {
  const { user } = req;
  if (user) {
    return res.status(200).send(user);
  }
  return res.sendStatus(401);
};

const updateUser = async (req, res) => {
  try {
    const { user } = req;
    const { username } = req.body;
    if (username.trim().length < 1) {
      return res.status(400).send({
        errorMessage: 'the username must contain 1 character minimum',
      });
    }

    await dataAccess.updateUser(username, user.id);
    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).send({ errorMessage: error.message });
  }
};

module.exports = {
  getAllUsers,
  getCurrentUser,
  updateUser,
};
