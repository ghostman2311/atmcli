const fs = require("fs");
const FileSystem = require("./FileSystem");

module.exports = class Account {
  constructor(name) {
    this.#name = name;
  }
  #name;
  #balance;

  get name() {
    return this.#name;
  }
  get balance() {
    return this.#balance;
  }

  get filePath() {
    return `account/${this.#name}.txt`;
  }
  //   load() {
  //     fs.readFileSync(this.filePath, (err, data) => {
  //       if (err) console.error(err);
  //       else {
  //         this.#balance = data;
  //       }
  //     });
  //   }
  //   load() {
  //     return new Promise((resolve, reject) => {
  //       fs.readFile(this.filePath, (error, data) => {
  //         if (error) {
  //           return reject(error);
  //         }
  //         this.#balance = parseFloat(data);
  //         resolve();
  //       });
  //     });
  //   }
  async #load() {
    this.#balance = parseFloat(await FileSystem.read(this.filePath));
  }
  static async find(accountName) {
    const account = new Account(accountName);
    await account.#load();
  }
};
