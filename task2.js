// Task 2 - How Node.js Works (V8 + libuv)
//
// So basically when we run "node logger.js", Node doesn't run our JS by itself.
// It uses the V8 engine (the same engine Chrome uses) to actually read and
// execute our JavaScript code. V8 compiles our JS into machine code and runs
// it on ONE main thread, which is why normal JS code (like console.logs,
// variables, functions) always runs top to bottom in order.
//
// But V8 by itself can't do things like reading files or waiting for timers,
// because that's not really a "JavaScript" thing, its more of an OS level
// thing. This is where libuv comes in. libuv is a C library that Node uses
// behind the scenes to handle async stuff like file system operations,
// timers, network requests etc. It has its own thread pool and an event loop.
//
// So what happens is, when we call something like fs.readFile(), Node passes
// that task to libuv. libuv does the actual file reading in the background
// (not on the main thread) and once it's done, it puts the callback function
// back into a queue. The event loop keeps checking if the main thread (call
// stack) is empty, and once it is, it takes the callback from that queue and
// gives it back to V8 to run.
//
// Basically:
// - V8 = runs our JS code
// - libuv = handles the async / background work and the event loop
// and together they let Node do non-blocking stuff even though JavaScript
// itself is single threaded.

const fs = require('fs');

console.log("Task Logger Started");

// this line starts reading the file, but doesn't wait for it to finish
fs.readFile('./tasks.txt', 'utf8', function (err, data) {
  if (err) {
    console.log("could not read tasks.txt (maybe it doesn't exist yet)");
  } else {
    console.log("Here is whats currently in tasks.txt:");
    console.log(data);
  }
});

// this will print BEFORE the file contents show up above
// which proves that fs.readFile is non blocking / async
console.log("Reading the file... (this line runs before the file is actually read)");
