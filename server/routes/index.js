const router = require('express').Router();

const autenticateRouter = require('./authentication');
const channelRouter = require('./channel');
const messageRouter = require('./message');
const userRouter = require('./user');
const uploadRouter = require('./upload');

router.use(
  autenticateRouter,
  channelRouter,
  messageRouter,
  userRouter,
  uploadRouter
);

module.exports = router;
