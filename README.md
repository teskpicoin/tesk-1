# Tesk
It's a a powerful and simple [node](http://nodejs.org) module to execute synchronous tasks or asynchronous tasks.

## Installation

```bash
$ npm install --save tesk
```

## Do Sync - quick usage
Do Sync it's a list of tasks that you can create to execute in sequence one by one. When the last task was finished, the tesk go to callback in exec function.

```javascript
const tesk = require('tesk');
const result = new Array();

tesk()
    .do((task) => {
        console.log('Do something 1');

        // Simulating a asynchronous task like a database query
        setTimeout(() => {
	    result.push("task 1");

	    task.next();
        }, 2000);
    })
    .do((task) => {
        console.log('Do something 2');
        result.push("task 2");

        task.next();
    })
    .do((task) => {
        console.log('Do something 3');
        result.push("task 3");

        task.next();
    })
    .exec((err) => {
        console.log('All tasks finished!');
        console.log('Results:', result);
    });
```

## Do Async - quick usage
Do Async it's a list of tasks that you can create to execute without order. When all tasks was finished, the tesk go to callback in exec function. All tasks will be executed at same time (but not in parallel like a thread).

```javascript
const tesk = require('tesk');
const result = new Array();

tesk()
    .do((task) => {
        console.log('Do something 1');

        // Simulating a asynchronous task like a database query
        setTimeout(() => {
	    result.push("task 1");

	    task.next();
        }, 2000);
    })
    .do((task) => {
        console.log('Do something 2');
        result.push("task 2");

        task.next();
    })
    .do((task) => {
        console.log('Do something 3');
        result.push("task 3");

        task.next();
    })
    .execAsync((err) => {
        console.log('All tasks finished!');
        console.log('Results:', result);
    });
```

## Tests
To run the test suite, first install the dependencies, then run npm run test:

```bash
$ npm install
$ npm run test
```

## License
[MIT](LICENSE)
