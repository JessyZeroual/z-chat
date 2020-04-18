const router = require('express').Router();
const controller = require('../controller');
const { allowAuthenticatedUserOnly } = require('../middleware');

router.use(allowAuthenticatedUserOnly);

router.get(
  '/channels/:channelId/:limit/:offset/messages',
  controller.getMessagesByChannelId
);
router.post('/messages', controller.createMessage);
router.post('/hasSawMessage/:id', controller.hasSawMessage);
router.delete('/messages/:id', controller.deleteMessage);

module.exports = router;
