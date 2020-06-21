const channel = require('./channel');
const user = require('./user');
const authentication = require('./authentication');
const message = require('./message');
const upload = require('./upload');

module.exports = {
  ...channel,
  ...user,
  ...authentication,
  ...message,
  ...upload,
};
