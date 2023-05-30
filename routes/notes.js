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
  const newNote = {
    title,
    text,
    id: fs.uuid(),
  };
  const success = fs.addNote(newNote);
  if (success instanceof Error) {
    return res.status(500).json(success);
  }
  return res.status(201).json(success);
});

module.exports = notes;
