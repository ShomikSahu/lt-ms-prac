// Task 4 - NodeJS REPL Introduction
//
// I tested this in the REPL first before putting it in the file.
// just typed "node" in the terminal to open it, then:
//
//   > const now = new Date();
//   > now.toLocaleString();
//   '28/08/2026, 10:15:32 am'
//
// typed .exit to get out of the REPL after that.
//
// then i just took that and put it into a function below so i can use it
// to timestamp tasks whenever i log one.

const fs = require('fs');

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

// this is the snippet from the REPL, just wrapped in a function
function getTimestamp() {
  return new Date().toLocaleString();
}

console.log("Current timestamp would be: " + getTimestamp());
