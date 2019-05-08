
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts").insert([
    { name: "WEB18" },
    { name: "WEB19" },
    { name: "WEB20" }
  ]);
};
