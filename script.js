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
  try {
    const accountName = await CommandLine.ask("What would you like to do?");
    const account = await Account.find(accountName);
    if (account == null) account = await promptCreateAccount(accountName);
    if (account != null) await promptTask(account);
  } catch (e) {
    await CommandLine.print("ERROR: Please try again later ");
  }
}

async function promptCreateAccount(accountName) {
  const response = await CommandLine.ask(
    "Oops That account didn't exist :( Would you like to create new account?[yes/no]"
  );
  if (response === "yes") {
    return await Account.create(accountName);
  }
}

async function promptTask(account) {
  const response = await CommandLine.ask(
    "Which transaction would you like to do?[view/deposit/withdraw]"
  );
  if (response === "deposit") {
    const amount = parseFloat(await CommandLine.ask("How much?"));
    await account.deposit(amount);
  } else if (response === "withdraw") {
    const amount = parseFloat(await CommandLine.ask("How much to withdraw?"));
    await account.withdraw(amount);
  }
  CommandLine.print(`Your updated balance is ${account.balance}`);
}

main();
