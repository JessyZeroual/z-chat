const router = require('express').Router();
const controller = require('../controller');
const { allowAuthenticatedUserOnly } = require('../middleware');

router.use(allowAuthenticatedUserOnly);

router.patch('/user/upload', controller.uploadAvatarUser);

module.exports = router;
