const router = require('express').Router();

const autenticateRouter = require('./authentication');
const channelRouter = require('./channel');
const messageRouter = require('./message');

router.use(autenticateRouter, channelRouter, messageRouter);

module.exports = router;
