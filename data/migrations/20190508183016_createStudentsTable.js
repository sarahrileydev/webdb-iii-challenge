
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl) {
    tbl.increments();

    tbl.string('name', 128).notNullable();

    tbl //foreign key
    .integer('cohort_id')//..
    .unsigned() //include this because some db ms need it
    .references('id')//primary key in the parent table
    .inTable('cohorts')//the name of the parent table
    .onDelete('CASCADE') //delete joined child ids as well
    .onUpdate('CASCADE')

    tbl.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
