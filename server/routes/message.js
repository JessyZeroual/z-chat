const router = require('express').Router();
const controller = require('../controller');
const { allowAuthenticatedUserOnly } = require('../middleware');

router.use(allowAuthenticatedUserOnly);

router.get(
  '/channels/:channelId/:limit/:offset/messages',
  controller.getMessagesByChannelId
);
router.get('/notifications', controller.getNotificationsByChannels);
router.post('/messages', controller.createMessage);
router.patch('/messages', controller.hasSeenMessage);
router.delete('/messages/:id', controller.deleteMessage);

module.exports = router;
