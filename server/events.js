const EventEmitter = require('events');

const EVENTS = Object.freeze({
  MESSAGE_CREATED: 'MESSAGE_CREATED',
  AVATAR_URL_UPDATED: 'AVATAR_URL_UPDATED',
});

const eventEmitter = new EventEmitter();

module.exports = {
  EVENTS,
  eventEmitter,
};
