const fs = require("fs");

class File {
  constructor(file) {
    this._file = file;
  }

  canAccess() {
    try {
      fs.accessSync(this._file, fs.constants.R_OK | fs.constants.W_OK);
      return true;
    } catch (err) {
      return err;
    }
  }

  write(data) {
    try {
      fs.writeFileSync(this._file, data);
    } catch (err) {
      throw new Error(err);
    }
  }

  read() {
    try {
      return fs.readFileSync(this._file, "utf8");
    } catch (err) {
      throw new Error(err);
    }
  }

  delete() {
    try {
      fs.unlinkSync(this._file);
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = { File };
