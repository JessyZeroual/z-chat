const createChannelAndGetId = require('./createChannelAndGetId');
const scrappingForLink = require('./scrappingForLink');

module.exports = {
  ...createChannelAndGetId,
  ...scrappingForLink,
};
