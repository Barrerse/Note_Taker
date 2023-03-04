const apiRoute = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, deleteFromFile } = require('../helpers/fsUtils');

// GET route to return all notes from db.json
apiRoute.get('/notes', (req, res) => {
  console.log(`${req.method} received`);
  readFromFile('./db/db.json')
    .then((data) => {
      res.json(JSON.parse(data));
    })
    .catch((err) => {
      console.log(err);
      res.json([]);
    });
});

// POST route to add a new note to db.json
apiRoute.post('/notes', (req, res) => {
  console.log(`${req.method} request received`);
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json')
      .then(() => res.json('Note Added!'))
      .catch((err) => console.error(err));
  } else {
    res.status(400).json({ error: 'Please include both a title and text for your note.' });
  }
});

// DELETE route to remove a note from db.json by ID
apiRoute.delete('/notes/:id', (req, res) => {
  console.log(`${req.method} request to delete a note`);
  const id = req.params.id;

  deleteFromFile(id, './db/db.json')
    .then(() => res.json({ success: true }))
    .catch((err) => console.error(err));
});

module.exports = apiRoute;
