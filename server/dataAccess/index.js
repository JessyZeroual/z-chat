const channel = require('./channel');
const user = require('./user');
const authentication = require('./authentication');
const message = require('./message');

module.exports = {
  ...channel,
  ...user,
  ...authentication,
  ...message,
};
