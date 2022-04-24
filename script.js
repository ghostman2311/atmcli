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
  Account.find(accountName);
}

main();
