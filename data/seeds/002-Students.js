
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Sarah', cohort_id:"1"},
        {name: 'Jan', cohort_id:"3"},
        {name: 'Tim', cohort_id:"2"}
      ]);
    });
};
