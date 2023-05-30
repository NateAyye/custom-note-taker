/***
 * @summary This class contains methods for reading and writing to the db.json file
 * @class FsUtils
 * @property {object} fs - The fs module
 * @property {object} path - The path module
 * @property {string} dbPath - The path to the db.json file
 * @property {array|object} notes - The notes from the db.json file
 * @method getNotes - Gets all the notes from the db.json file
 * @method addNote - Adds a note to the db.json file
 * @method findNoteById - Finds a note in the db.json file based of the id passed in
 * @method deleteNoteById - Deletes a note from the db.json file based of the id passed in
 * @method uuid - Generates a random id
 * @method getDbPath - Gets the path to the db.json file
 * @method setDbPath - Sets the path to the db.json file
 */
class FsUtils {
  /***
   * @summary Constructor for the FsUtils class that has an optional parameter for the path to the db.json file
   * @param {string} dbPath - The path to the db.json file
   * @returns {object} - Returns an instance of the FsUtils class
   */
  constructor(dbPath = undefined) {
    this.fs = require('fs');
    this.path = require('path');
    this.dbPath = dbPath ?? this.path.join(__dirname, '..', 'db', 'db.json');
    this.notes = this.getNotes();
  }
  /***
   * @summary Gets the path to the db.json file
   * @returns {string} - Returns the path to the db.json file
   */
  get getDbPath() {
    return this.dbPath;
  }
  /***
   * @summary Sets the path to the db.json file
   * @param {string} dbPath - The path to the db.json file
   * @returns {void}
   */
  set setDbPath(dbPath) {
    this.dbPath = dbPath;
  }
  /***
   * @summary Gets all the notes from the db.json file
   * @returns {array|object} - Returns an array of notes if successful, otherwise returns an error object
   */
  getNotes() {
    try {
      const data = this.fs.readFileSync(this.dbPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return error;
    }
  }
  /***
   * @summary Adds a note to the db.json file
   * @param {object} note - The note to add to the db.json file
   * @returns {boolean|object} - Returns true if the note was added successfully, otherwise returns an error object
   */
  addNote(note) {
    try {
      this.notes.push(note);
      this.fs.writeFileSync(this.dbPath, JSON.stringify(this.notes, null, 2));
      return true;
    } catch (error) {
      return error;
    }
  }
  /***
   * @summary Finds a note in the db.json file based of the id passed in
   * @param {string} id - The id of the note to find
   * @returns {object|object} - Returns the note if found, otherwise returns undefined
   */
  findNoteById(id) {
    try {
      const note = this.notes?.find((note) => note.id === id);
      return note;
    } catch (error) {
      return error;
    }
  }
  /***
   * @summary Deletes a note from the db.json file based of the id passed in
   * @param {string} id - The id of the note to delete
   * @returns {boolean|object} - Returns true if the note was deleted successfully, otherwise returns an error object
   */
  deleteNoteById(id) {
    try {
      this.notes = this.notes.filter((note) => note.id !== id);
      this.fs.writeFileSync(this.dbPath, JSON.stringify(this.notes, null, 2));
      return true;
    } catch (error) {
      return error;
    }
  }
  /***
   * Source for this code: from the 11-Express/01-Activities/Day3/22-Stu-Modular-Routing/Solved/helpers/uuid.js file
   *
   * @summary Generates a random id of 4 characters with random letters and numbers
   */
  uuid() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(2);
  }
}

module.exports = FsUtils;
