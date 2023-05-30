const express = require('express');
const notes = express.Router();
const fsUtils = require('../helpers/fsUtils');

const fs = new fsUtils();

notes.get('/', (req, res) => {
  res.json(fs.getNotes());
});

module.exports = notes;
