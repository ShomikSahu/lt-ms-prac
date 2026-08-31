// Task 8 - Asynchronous Programming & Callback Functions
//
// saveTaskCallback() adds a task to tasks.txt using fs.appendFile.
// it uses an error-first callback, meaning if something goes wrong
// the error gets passed first, otherwise it just passes null.
 
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
 
const taskDescription = process.argv.slice(2).join(' ');
 
if (!taskDescription) {
  console.log('No task provided. Usage: node task8.js "Your task here"');
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
          console.log("Task saved successfully!");
        }
      });
    } else {
      console.log("Task discarded - not saved.");
    }
 
    rl.close();
  });
}