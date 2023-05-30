const express = require('express');
const notes = express.Router();
const fsUtils = require('../helpers/fsUtils');

const fs = new fsUtils();

// GET /api/notes - Should read the db.json file and return all saved notes as JSON.
notes.get('/', (req, res) => {
  // Get all notes
  const notes = fs.getNotes();

  // If there was an error getting the notes, return a 500 error
  if (notes instanceof Error) return res.status(500).json(notes);

  // Otherwise, return a 200 status code and the notes
  return res.status(200).json(fs.getNotes());
});

// POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
notes.post('/', (req, res) => {
  // Destructure title and text from req.body
  const { title, text } = req.body;

  // If title or text are missing, return a 400 error
  if (!title || !text) {
    return res.status(400).json({ msg: 'Please include title and text' });
  }

  // Add the note to the db.json file
  const success = fs.addNote({
    title,
    text,
    id: fs.uuid(),
  });

  // If there was an error adding the note, return a 500 error
  if (success instanceof Error) return res.status(500).json(success);
  // Otherwise, return a 201 status code and the note
  return res.status(201).json(success);
});

// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
notes.delete('/:id', (req, res) => {
  // Destructure id from req.params
  const { id } = req.params;
  // Find the note by id
  const foundNote = fs.findNoteById(id);

  // If there was an error finding the note, return a 500 error
  if (foundNote instanceof Error) return res.status(500).json(foundNote);

  // If the note wasn't found, return a 404 error
  if (!foundNote) return res.status(404).json({ msg: 'Note not found' });

  // Otherwise, delete the note and return a 200 status code
  const success = fs.deleteNoteById(id);

  // If there was an error deleting the note, return a 500 error
  if (success instanceof Error) return res.status(500).json(success);
  return res.status(200).json(success);
});

// GET /api/notes/:id - Should receive a query parameter containing the id of a note to retrieve. This means you'll need to find a way to give each note a unique id when it's saved. In order to retrieve a specific note, you'll need to read all notes from the db.json file and return the note with the given id property.
notes.get('/:id', (req, res) => {
  // Destructure id from req.params
  const { id } = req.params;
  // Find the note by id
  const foundNote = fs.findNoteById(id);

  // If there was an error finding the note, return a 500 error
  if (foundNote instanceof Error) return res.status(500).json(foundNote);

  // If the note wasn't found, return a 404 error
  if (!foundNote) return res.status(404).json({ msg: 'Note not found' });

  // Otherwise, return a 200 status code and the note
  return res.status(200).json(foundNote);
});

module.exports = notes;
