class FsUtils {
  constructor() {
    this.fs = require('fs');
    this.path = require('path');
  }

  getNotes() {
    try {
      const data = this.fs.readFileSync(
        this.path.join(__dirname, '..', 'db', 'db.json'),
        'utf-8',
      );
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = FsUtils;