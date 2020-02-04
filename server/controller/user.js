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

module.exports = {
  getAllUsers,
  getCurrentUser,
};
