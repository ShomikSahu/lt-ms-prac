// Task 10 - JavaScript Promises - Introduction, Detail & Revisited
//
// saveTaskPromise() does the same thing as saveTaskCallback() from task 8,
// just rewritten to use a Promise instead of a callback. fs.promises.appendFile
// already returns a promise on its own so i didn't even need to wrap it in
// a new Promise() myself. then i just use .then() and .catch() when i call it
// instead of passing in a callback function.
 
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
 
// old callback version from task 8, keeping it here just to compare
// function saveTaskCallback(task, callback) {
//   fs.appendFile(TASKS_FILE, task, function (err) {
//     if (err) callback(err);
//     else callback(null);
//   });
// }
 
// new promise version
function saveTaskPromise(task) {
  return fs.promises.appendFile(TASKS_FILE, task);
}
 
let tasksLoggedCount = 0;
 
const taskDescription = process.argv.slice(2).join(' ');
 
if (!taskDescription) {
  console.log('No task provided. Usage: node task10.js "Your task here"');
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
 
      saveTaskPromise(entry)
        .then(function () {
          tasksLoggedCount++;
          console.log("Task saved successfully!");
        })
        .catch(function (err) {
          console.log("Failed to save task: " + err.message);
        });
    } else {
      console.log("Task discarded - not saved.");
    }
 
    rl.close();
  });
}
 
// timers (same as task 9)
setTimeout(function () {
  console.log("Reminder: review your tasks");
}, 5000);
 
const intervalId = setInterval(function () {
  console.log("Tasks logged so far: " + tasksLoggedCount);
}, 3000);
 
setTimeout(function () {
  clearInterval(intervalId);
  console.log("Stopped the tasks-logged interval after 15s.");
}, 15000);