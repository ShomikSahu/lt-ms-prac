// Task 7 - Debugging Node Programs & Debugging Techniques
//
// the bug i put in on purpose: in the confirmation check below i originally
// had this:
//     const confirmed = answer.trim().toLowerCase() === 'Y';
// which doesn't make sense because im already lowercasing the answer but
// then comparing it to an uppercase 'Y', so typing "y" would never match
// and it would always say the task got discarded even if you typed y.
//
// how i found it: ran node --inspect task7.js "test task" and opened
// chrome://inspect in chrome, then set a breakpoint on the "const confirmed ="
// line (you can also just use vscode's Run and Debug with F5 and a
// breakpoint on the same line, does the same thing). stepped over that line
// and checked the value, answer.trim().toLowerCase() was 'y' but it was
// being compared to 'Y' so it never matched and confirmed was always false.
// fixed it by just changing the 'Y' to lowercase 'y'.

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
  console.log('No task provided. Usage: node task7.js "Your task here"');
} else {
  console.log("Task received: \"" + taskDescription + "\"");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Save this task? (y/n): ', function (answer) {
    const confirmed = answer.trim().toLowerCase() === 'y'; // fixed, was 'Y' before

    if (confirmed) {
      console.log("Confirmed at " + getTimestamp() + " - \"" + taskDescription + "\" would be saved (saving added in Task 8).");
    } else {
      console.log("Task discarded - not saved.");
    }

    rl.close();
  });
}