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
  return db.runSql(`CREATE TABLE app_user(
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    channels INTEGER ARRAY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE IF EXISTS app_user`);
};

exports._meta = {
  version: 1,
};
