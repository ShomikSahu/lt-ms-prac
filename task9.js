// Task 9 - Node Timers & Global Objects
//
// setTimeout runs a reminder once, 5 seconds after the app starts.
// setInterval keeps printing how many tasks got logged, every 3 seconds,
// and then another setTimeout calls clearInterval at 15 seconds so it
// doesn't just keep going forever.

const fs = require('fs');
const readline = require('readline');

const TASKS_FILE = './tasks.txt';

console.log("Task Logger Started");

fs.readFile(TASKS_FILE, 'utf8', function (err, data) {
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

// appends a task to the file, then calls back with an error (or null if it worked)
function saveTaskCallback(task, callback) {
  fs.appendFile(TASKS_FILE, task, function (err) {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

let tasksLoggedCount = 0;

const taskDescription = process.argv.slice(2).join(' ');

if (!taskDescription) {
  console.log('No task provided. Usage: node task9.js "Your task here"');
} else {
  console.log("Task received: \"" + taskDescription + "\"");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Save this task? (y/n): ', function (answer) {
    const confirmed = answer.trim().toLowerCase() === 'y';

    if (confirmed) {
      const entry = "[" + getTimestamp() + "] " + taskDescription + "\n";

      saveTaskCallback(entry, function (err) {
        if (err) {
          console.log("Failed to save task: " + err.message);
        } else {
          tasksLoggedCount++;
          console.log("Task saved successfully!");
        }
      });
    } else {
      console.log("Task discarded - not saved.");
    }

    rl.close();
  });
}

// timers
setTimeout(function () {
  console.log("Reminder: review your tasks");
}, 5000);

const intervalId = setInterval(function () {
  console.log("Tasks logged so far: " + tasksLoggedCount);
}, 3000);

// stop the interval after 15 seconds so it doesn't run forever
setTimeout(function () {
  clearInterval(intervalId);
  console.log("Stopped the tasks-logged interval after 15s.");
}, 15000);