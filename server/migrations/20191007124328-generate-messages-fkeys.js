/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

let dbm;
let type;
let seed;

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
    ALTER TABLE message
    ADD FOREIGN KEY (channel_id) REFERENCES channel (id),
    ADD FOREIGN KEY (user_id) REFERENCES users (id)
  `);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  version: 1,
};
