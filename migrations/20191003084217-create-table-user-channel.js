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
  return db.runSql(`CREATE TABLE user_channel(
    user_id INTEGER,
    channel_id INTEGER
  )`);
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE IF EXISTS user_channel`);
};

exports._meta = {
  version: 1,
};
