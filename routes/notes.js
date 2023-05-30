const express = require('express');
const notes = express.Router();
const fsUtils = require('../helpers/fsUtils');

const fs = new fsUtils();

notes.get('/', (req, res) => {
  const notes = fs.getNotes();
  if (notes instanceof Error) {
    return res.status(500).json(notes);
  }
  return res.status(200).json(fs.getNotes());
});

notes.post('/', (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({ msg: 'Please include title and text' });
  }
  const success = fs.addNote({
    title,
    text,
    id: fs.uuid(),
  });
  if (success instanceof Error) {
    return res.status(500).json(success);
  }
  return res.status(201).json(success);
});

notes.delete('/:id', (req, res) => {
  const { id } = req.params;
  const foundNote = fs.findNoteById(id);
  if (!foundNote) return res.status(404).json({ msg: 'Note not found' });
  const success = fs.deleteNoteById(id);
  if (success instanceof Error) {
    return res.status(500).json(success);
  }
  return res.status(200).json(success);
});

notes.get('/:id', (req, res) => {
  const { id } = req.params;
  const foundNote = fs.findNoteById(id);
  if (!foundNote) return res.status(404).json({ msg: 'Note not found' });
  return res.status(200).json(foundNote);
});

module.exports = notes;
