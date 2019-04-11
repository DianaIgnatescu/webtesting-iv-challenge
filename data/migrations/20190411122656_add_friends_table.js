
exports.up = function(knex, Promise) {
  return knex.schema.createTable('friends', function(tbl) {
    tbl.increments();
    tbl
        .string('name', 255)
        .notNullable()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('friends');
};
