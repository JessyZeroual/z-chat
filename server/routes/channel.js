const router = require('express').Router();
const controller = require('../controller/controller');
const { allowAuthenticatedUserOnly } = require('../middleware/middlewares');

router.use(allowAuthenticatedUserOnly);

router.get('/channels', controller.getAllChannels);
router.post('/channels', controller.createChannel);

module.exports = router;
