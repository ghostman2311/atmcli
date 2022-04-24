const fs = require("fs");

module.exports = class FileSystem {
  static read(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (error, data) => {
        if (error) return reject(error);
        resolve(data);
      });
    });
  }
};
