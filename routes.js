const router = require('express').Router();
const bodyParser = require('body-parser');
const session = require('express-session');
const controller = require('./controller');
require('dotenv').config();

const TWO_HOURS = 1000 * 60 * 60 * 2;
const {
  NODE_ENV = 'development',

  SESS_NAME = 'sid',
  SESSION_SECRET = 'fsb#/dkjf@!iWj!?',
  SESS_LIFETIME = TWO_HOURS,
} = process.env;

const IN_PROD = NODE_ENV === 'production';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(
  session({
    name: SESS_NAME,
    resave: false,

    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true, // 'strict'
      secure: IN_PROD,
    },
  })
);

router.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

router.get('/channels', controller.getAllChannels);
router.post('/channels', controller.createChannel);

router.get('/channels/:channelId/messages', controller.getMessagesByChannelId);
router.post('/messages', controller.createMessage);

router.post('/signup', controller.createUser);
router.post('/signin', controller.signin);
module.exports = router;
