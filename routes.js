const router = require('express').Router();
const controller = require('./controller');
require('dotenv').config();
const { allowAuthenticatedUserOnly } = require('./middlewares');

router.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

router.post('/signup', controller.createUser);
router.post('/signin', controller.signin);
router.get('/getcurrentuser', controller.getCurrentUser);

router.use(allowAuthenticatedUserOnly);

router.get('/channels', controller.getAllChannels);
router.post('/channels', controller.createChannel);

router.get('/channels/:channelId/messages', controller.getMessagesByChannelId);
router.post('/messages', controller.createMessage);

router.delete('/logout', controller.logout);

module.exports = router;
