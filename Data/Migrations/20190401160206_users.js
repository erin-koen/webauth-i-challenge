exports.up = function(knex) {
  return knex.schema.createTable("users", function(tbl) {
    //auto-incrementing ID
    tbl.increments();
    tbl.string("first_name", 128).notNullable();
    tbl.string("last_name", 128).notNullable();
    //username - string, required, unique
    tbl
      .string("username", 128)
      .notNullable()
      .unique();
    //password - string, required
    tbl.string("password", 128).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
