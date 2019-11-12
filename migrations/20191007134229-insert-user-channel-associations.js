'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(`
  INSERT INTO user_channel (user_id, channel_id) VALUES
  (1, 3),
  (1, 4),
  (2, 3),
  (2, 5)
  `);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  version: 1,
};
