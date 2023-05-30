class FsUtils {
  constructor() {
    this.fs = require('fs');
    this.path = require('path');
    this.dbPath = this.path.join(__dirname, '..', 'db', 'db.json');
    this.notes = this.getNotes();
  }

  getNotes() {
    try {
      const data = this.fs.readFileSync(this.dbPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return error;
    }
  }
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
