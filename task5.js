// Task 5 - Node Process Object, Command Line & Terminal I/O
//
// run it like this: node task5.js "Finish Node.js assignment"
//
// process.argv is just an array node gives us, argv[0] is the node path,
// argv[1] is the path to this file, and anything after that (argv[2] etc)
// is whatever we typed after the filename in the terminal.

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

// grabbing everything after "node task5.js" and joining it into one string
const taskDescription = process.argv.slice(2).join(' ');

if (!taskDescription) {
  console.log('No task provided. Usage: node task5.js "Your task here"');
} else {
  console.log("Task received: \"" + taskDescription + "\"");

  // readline lets us actually ask the user something in the terminal
  // and wait for them to type a response
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