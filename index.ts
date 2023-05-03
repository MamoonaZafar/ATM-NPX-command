#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';

// Generate random user data
const user = {
  id: Math.floor(Math.random() * 1000000000),
  pin: Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
  balance: Math.floor(Math.random() * 10000),
};

// Display welcome message
console.log(chalk.blue(figlet.textSync('ATM')));

// Prompt for user id and pin
inquirer.prompt([
  {
    type: 'input',
    name: 'id',
    message: 'Enter User ID:',
  },
  {
    type: 'password',
    name: 'pin',
    message: 'Enter User PIN:',
    mask: '*',
  },
]).then(answers => {
  // Check if user id and pin match
  // if (answers.id == user.id && answers.pin == user.pin) 
  {
    // Display ATM options
    inquirer.prompt([
      {
        type: 'list',
        name: 'option',
        message: 'Select an option:',
        choices: ['Check Balance', 'Withdraw', 'Exit'],
      },
    ]).then(({ option }) => {
      switch (option) {
        case 'Check Balance':
          console.log(`Your balance is ${user.balance}`);
          break;
        case 'Withdraw':
          inquirer.prompt([
            {
              type: 'input',
              name: 'amount',
              message: 'Enter amount to withdraw:',
              validate: (input) => {
                if (isNaN(input)) {
                  return 'Please enter a valid amount';
                } else if (Number(input) > user.balance) {
                  return 'Insufficient balance';
                } else {
                  return true;
                }
              },
            },
          ]).then(({ amount }) => {
            const newBalance = user.balance - Number(amount);
            user.balance = newBalance;
            console.log(`Withdrawn amount: ${amount}\nNew balance: ${newBalance}`);
          });
          break;
        case 'Exit':
          console.log('Thank you for using the ATM!');
          break;
      }
    });
  // } else {
  //   console.log('Invalid user ID or PIN');
  }
});
