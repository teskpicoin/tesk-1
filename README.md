# Tesk
It's a a powerful and simple [node](http://nodejs.org) module to execute synchronous tasks or asynchronous tasks.

## Installation

```bash
$ npm install --save tesk
```
## Quick usage

```javascript
const tesk = require('tesk');
const result = new Array();

tesk()
    .do((task) => {
        console.log('Do something 1');
	result.push("task 1");
	
	task.next();
    })
    .do((task) => {
        console.log('Do something 2');
        result.push("task 2");

        task.next();
    })
    .exec((err) => {
        console.log('All tasks finished!');
        console.log('Results:', result);
    });
```

## .do - sync usage
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

## .do - async usage
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

## .forEach - sync usage
ForEach sync is for iterate an array in sequence item by item and wait the current task finish to go to next item on array.

```javascript
const tesk = require('tesk');
const result = '';

tesk()
    .forEach([1, 2, 3, 4], (elem, index, task) => {
        if (index == 2) {
            setTimeout(() => {
	        result += elem;
	        task.next();
            }, 1);
        }
        else {
            result += elem;
            task.next();
        }
    })
    .exec((err) => {
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
