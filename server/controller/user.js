const path = require('path');
const dataAccess = require('../dataAccess');
const { EVENTS, eventEmitter } = require('../events');

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

const uploadAvatarUser = async (req, res) => {
  const { user } = req;
  const imageFile = await req.files.file;
  const imagePath = path.join(
    __dirname,
    '../uploads',
    'avatar',
    `${user.email}-${imageFile.md5}.jpg`
  );

  if (imageFile.mimetype.substr(0, 5)) {
    imageFile.mv(imagePath, err => {
      if (err) {
        return res.status(500).send(err);
      }

      dataAccess.updateAvatarUser(
        `/avatar/${user.email}-${imageFile.md5}.jpg`,
        user.id
      );

      return res.status(201).send('file uploaded');
    });
  } else {
    return res
      .status(500)
      .send('Provide a jpeg, jpg or png image and size maximum 5mb');
  }
  return eventEmitter.emit(EVENTS.AVATAR_URL_UPDATED, {
    avatar_url: `/avatar/${user.email}-${imageFile.md5}.jpg`,
    userId: user.id,
  });
};

module.exports = {
  getAllUsers,
  getCurrentUser,
  uploadAvatarUser,
};
