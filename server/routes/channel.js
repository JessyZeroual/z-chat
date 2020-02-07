const router = require('express').Router();
const controller = require('../controller');
const { allowAuthenticatedUserOnly } = require('../middleware');

router.use(allowAuthenticatedUserOnly);

router.get('/channels', controller.getAllChannels);
router.get('/:channelId/channels', controller.getChannelById);
router.post('/channels', controller.createChannel);

module.exports = router;
