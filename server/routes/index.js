const router = require('express').Router();

const autenticateRouter = require('./authentication');
const channelRouter = require('./channel');
const messageRouter = require('./message');
const userRouter = require('./user');

router.use(autenticateRouter, channelRouter, messageRouter, userRouter);

module.exports = router;
