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
  INSERT INTO app_user (name, email, password) VALUES
  ('élé','ele@gmail.com','secret'),
  ('jessy','jessy@gmail.com','secret'),
  ('etienne','etienne@gmail.com','secret')
  `);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  version: 1,
};
