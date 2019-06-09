const express = require('express');

const Friends = require('../friends/friendsModel.js');

const db = require('../data/dbConfig');

const server = express();
server.use(express.json());

server.get('/api', async (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/api/friends', async (req, res) => {
  const rows = await Friends.getAll();

  res.status(200).json(rows);
});

server.post('/api/friends', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ errorMessage: 'Please provide a name for the friend.' });
  } else {
    db('friends').insert({ name })
      .then(arrayOfIds => {
        return db('friends').where({ id: arrayOfIds[0] })
      })
      .then(arrayOfFriends => {
        res.status(201).json({ ...arrayOfFriends[0] });
      })
      .catch(error => {
        res.status(500).json({ errorMessage: 'The friend could not be added. '});
      });
  }
});

server.delete('/api/friends', async (req, res) => {
  const { name } = req.body;
  if(!name) {
    res.status(400).json({ errorMessage: 'Could not delete.'})
  } else {
    const deleted = await Friends.remove(name);
    res.status(200).json(deleted);
  }
});

server.delete('/api/friends/:id', (req, res) => {
  const { id } = req.params;
  Friends.remove(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'The specified ID does not exist.' });
      } else {
        res.status(200).json({ message: `The ID ${id} has now been removed from the database.` });
      }
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: 'The friend could not be removed.' });
    });
});

module.exports = server;
