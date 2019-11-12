const router = require('express').Router();
const bodyParser = require('body-parser');
const controller = require('./controller');
require('dotenv').config();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

// La routes du server appel une fonction du controller
router.get('/channels', controller.getAllChannels);
router.post('/channels', controller.createChannel);

router.get('/channels/:channelId/messages', controller.getMessagesByChannelId);
router.post('/messages', controller.createMessage);
module.exports = router;
