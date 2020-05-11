const path = require('path');
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

const uploadAvatarUser = async (req, res) => {
  const { user } = req;
  const imageFile = await req.files.file;
  const imagePath = path.join(
    __dirname,
    '../uploads',
    'avatar',
    `${user.email}-${imageFile.md5}.jpg`
  );

  if (imageFile.mimetype.substr(0, 5) === 'image' && imageFile.size < 1000000) {
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
      .send('Provide a jpeg, jpg or png image and size maximum 1mb');
  }
  return `/avatar/${user.email}-${imageFile.md5}.jpg`;
};

module.exports = {
  getAllUsers,
  getCurrentUser,
  uploadAvatarUser,
};
