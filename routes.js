const router = require('express').Router();
const controller = require('./controller');
require('dotenv').config();

router.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

router.get('/channels', controller.getAllChannels);
router.post('/channels', controller.createChannel);

router.get('/channels/:channelId/messages', controller.getMessagesByChannelId);
router.post('/messages', controller.createMessage);

router.post('/signup', controller.createUser);
router.post('/signin', controller.signin);

router.get('/getcurrentuser', controller.getCurrentUser);

module.exports = router;
