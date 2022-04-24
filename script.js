//1. Ask for account
//2. If account doesn't exist ask to create account
//3. Ask what they want to do
//4. Execute command
//Command supported
//--View
//--Withdraw
//--Deposit

const Account = require("./Account");
const CommandLine = require("./CommandLine");

async function main() {
  const accountName = await CommandLine.ask("What would you like to do");
  const account = await Account.find(accountName);
  if (account == null) await promptCreateAccount(accountName);
}

async function promptCreateAccount(accountName) {
  const response = await CommandLine.ask(
    "Oops That account didn't exist :( Would you like to create new account?[yes/no]"
  );
  if (response === "yes") {
    return await Account.create(accountName);
  }
}

main();
