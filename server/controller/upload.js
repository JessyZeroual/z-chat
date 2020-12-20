const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const dataAccess = require('../dataAccess');
const { EVENTS, eventEmitter } = require('../events');

const uploadOnCloud = async (imagePath, imageFile, user, tag) => {
  cloudinary.config(process.env.CLOUDINARY_URL);
  const resultUpload = await cloudinary.uploader.upload(
    imagePath,
    { public_id: `${tag}/${user.email}-${imageFile.md5}`, tags: tag },
    (err, image) => {
      if (err) return err;
      fs.unlinkSync(imagePath);
      return image;
    }
  );
  return resultUpload;
};

const uploadAvatarUser = async (req, res) => {
  try {
    const { user } = req;
    const imageFile = await req.files.file;
    const imagePath = path.join(
      __dirname,
      '../uploads',
      'avatar',
      `${user.email}-${imageFile.md5}.jpg`
    );

    await imageFile.mv(imagePath);

    const resultUpload = await uploadOnCloud(
      imagePath,
      imageFile,
      user,
      'avatar'
    );

    await dataAccess.updateAvatarUser(resultUpload.secure_url, user.id);

    return res.status(200).send(resultUpload);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  uploadAvatarUser,
};
