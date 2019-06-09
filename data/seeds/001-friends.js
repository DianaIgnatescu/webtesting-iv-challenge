
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('friends')
      .truncate()
      .then(function() {
        return knex('friends').insert([
          { name: 'Monica' },
          { name: 'Chandler' },
          { name: 'Phoebe' },
          { name: 'Ross' },
          { name: 'Rachel' },
        ]);
      });
};
