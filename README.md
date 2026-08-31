# Command-Line Task Logger

Each task from the assignment lives in its own file (`task1.js` through
`task10.js`), building cumulatively on the one before it. `task10.js` is the
final, fully-featured version.

## Task 1 — Setup

```bash
mkdir cli-task-logger && cd cli-task-logger
npm init -y
node task1.js
```
Prints `Task Logger Started`.

## Task 2 — `node task2.js`
V8/libuv explanation is the comment block at the top. Watch the console
output order: the "continuing without waiting..." line prints before the
`fs.readFile` callback's content — that's the non-blocking proof.

## Task 3 — `node task3.js`
Comment block lists the exact `fs` methods used and the docs page
(https://nodejs.org/api/fs.html) the read example was adapted from.

## Task 4 — REPL → `task4.js`
Open a plain `node` REPL first and try:
```js
> const now = new Date();
> now.toLocaleString();
```
`.exit` to leave. That snippet becomes `getTimestamp()` in `task4.js`.

## Task 5 — `node task5.js "Finish Node.js assignment"`
Reads the task from `process.argv`, then prompts `Save this task? (y/n):`
via `process.stdin`.

## Task 6 — nodemon
```bash
npm install --save-dev nodemon
npm run dev
```
`package.json`'s `dev` script runs `task10.js` under nodemon (task6.js itself
is unchanged from task5.js — this task is about tooling, not code). Edit and
save any file while `npm run dev` is running to see it auto-restart.

## Task 7 — `node --inspect task7.js "test task"`
Contains a comment describing an intentionally introduced bug (comparing the
confirmation answer to `'Y'` instead of `'y'`) and how it was found and fixed
using the debugger — see the comment block at the top of `task7.js`.

## Task 8 — `node task8.js "Buy groceries"`
`saveTaskCallback(task, callback)` appends to `tasks.txt` via `fs.appendFile`
with an error-first callback.

## Task 9 — `node task9.js "Buy groceries"`
Adds a 5s `setTimeout` reminder and a 3s `setInterval` task counter, cleared
via `clearInterval` at 15s. Let it run for 15+ seconds to see the full cycle.

## Task 10 — `node task10.js "Buy groceries"`
`saveTaskPromise(task)` is the Promise-based rewrite of `saveTaskCallback`,
called with `.then()`/`.catch()`. This is the final version of the project.

---

## Pushing to GitHub (one commit per task shows the progression)

```bash
git init
echo "node_modules/" > .gitignore
git add task1.js && git commit -m "Task 1: Node.js setup and entry file"
git add task2.js && git commit -m "Task 2: V8/libuv explanation + non-blocking demo"
git add task3.js && git commit -m "Task 3: fs docs methods + adapted example"
git add task4.js && git commit -m "Task 4: REPL date snippet moved into file"
git add task5.js && git commit -m "Task 5: process.argv and stdin confirmation"
git add task6.js package.json && git commit -m "Task 6: nodemon dev script"
git add task7.js && git commit -m "Task 7: debug and fix confirmation bug"
git add task8.js && git commit -m "Task 8: callback-based save with fs.appendFile"
git add task9.js && git commit -m "Task 9: setTimeout/setInterval timers"
git add task10.js && git commit -m "Task 10: Promise-based save with fs.promises"
git branch -M main
git remote add origin https://github.com/<your-username>/cli-task-logger.git
git push -u origin main
```
