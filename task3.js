// Task 3 - NodeJS Resources & Working with NodeJS Examples
//
// I basically took the example from that page (the async readFile with
// an error first callback) and just changed the file path to our own
// tasks.txt and changed what it logs so it prints the actual contents
// instead of the placeholder stuff from the docs.

const fs = require('fs');

console.log("Task Logger Started");

// adapted from the fs.readFile example on the node docs page
fs.readFile('./tasks.txt', 'utf8', function (err, data) {
  if (err) {
    console.log("could not read tasks.txt (maybe it doesn't exist yet)");
  } else {
    console.log("Here is whats currently in tasks.txt:");
    console.log(data);
  }
});

// same as task 2, this proves its non blocking since it prints first
console.log("Reading the file... (this line runs before the file is actually read)");