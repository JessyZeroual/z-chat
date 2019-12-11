const router = require('express').Router();
const bodyParser = require('body-parser');
const controller = require('./controller');
require('dotenv').config();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

router.get('/channels', controller.getAllChannels);
router.post('/channels', controller.createChannel);

router.get('/channels/:channelId/messages', controller.getMessagesByChannelId);
router.post('/messages', controller.createMessage);

router.post('/signup', controller.createUser);
// router.post('/login', controller.login);
module.exports = router;
