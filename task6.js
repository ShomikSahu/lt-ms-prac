// Task 6 - Node Packages - NodeMon & Monitoring Applications
//
// no actual code changes for this one, this task is more about the tooling
// side of things:
//   1. ran: npm install --save-dev nodemon
//   2. added a "dev" script in package.json: "dev": "nodemon task6.js"
//   3. ran npm run dev, then edited this file and saved it while it was
//      still running, and nodemon automatically restarted the app on its
//      own (you can see it print something like "[nodemon] restarting due
//      to changes..." in the terminal when that happens)

const fs = require('fs');
const readline = require('readline');

console.log("Task Logger Started");

fs.readFile('./tasks.txt', 'utf8', function (err, data) {
  if (err) {
    console.log("could not read tasks.txt (maybe it doesn't exist yet)");
  } else {
    console.log("Here is whats currently in tasks.txt:");
    console.log(data);
  }
});
console.log("Reading the file... (this line runs before the file is actually read)");

function getTimestamp() {
  return new Date().toLocaleString();
}

const taskDescription = process.argv.slice(2).join(' ');

if (!taskDescription) {
  console.log('No task provided. Usage: node task6.js "Your task here"');
} else {
  console.log("Task received: \"" + taskDescription + "\"");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Save this task? (y/n): ', function (answer) {
    const confirmed = answer.trim().toLowerCase() === 'y';

    if (confirmed) {
      console.log("Confirmed at " + getTimestamp() + " - \"" + taskDescription + "\" would be saved (saving added in Task 8).");
    } else {
      console.log("Task discarded - not saved.");
    }

    rl.close();
  });
}