const router = require('express').Router();
const controller = require('../controller');
const { allowAuthenticatedUserOnly } = require('../middleware');

router.use(allowAuthenticatedUserOnly);

router.get('/channels/:channelId/messages', controller.getMessagesByChannelId);
router.post('/messages', controller.createMessage);

module.exports = router;
