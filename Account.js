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
    return `accounts/${this.#name}.txt`;
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

  async deposit(amount) {
    FileSystem.write(this.filePath, this.balance + amount);
    this.#balance = this.#balance + amount;
  }
  static async find(accountName) {
    const account = new Account(accountName);
    try {
      await account.#load();
      return account;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  static async create(accountName) {
    const account = new Account(accountName);
    try {
      await FileSystem.write(account.filePath, 0);
      account.#balance = 0;
      return account;
    } catch (e) {
      console.log(e);
      return;
    }
  }
};
