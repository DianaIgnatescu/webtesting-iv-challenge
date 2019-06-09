const db = require('../data/dbConfig');

async function insert(friend) {
  const [id] = await db('friends').insert(friend);

  return db('friends').where({id}).first();
}

function remove(id) {
  return db('friends').where({id}).first().delete();
}

function getAll() {
  return db('friends');
}

module.exports = {
  insert,
  remove,
  getAll
};
