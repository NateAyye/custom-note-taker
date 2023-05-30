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

module.exports = notes;
