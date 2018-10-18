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
	result.push(1);
	
	task.next(); // Go to next task
    })
    .do((task) => {
        console.log('Do something 2');
        result.push(2);

        task.next(); // Go to next task
    })
    .exec((err) => {
	if (err) {
	    console.log(err);
	}
	else {
            console.log('All tasks finished!');
	    console.log('Result expected: [1, 2]');
            console.log('Result:', result);
	}
    });
```

## Guide
* [do(callback) - sync](#do---sync-usage)
* [do(callback) - async](#do---async-usage)
* [forEach(array, callback) - sync](#foreach---sync-usage)
* [forEach(array, callback) - async](#foreach---async-usage)
* [accept a task](#accept-a-task)
* [reject a task](#reject-a-task)

## do(callback) - sync usage
Do Sync it's a list of tasks that you can create to execute in sequence one by one. When the last task was finished, the tesk go to callback in exec function.

```javascript
const tesk = require('tesk');
const result = new Array();

tesk()
    .do((task) => {
        console.log('Do something 1');

        // Simulating a asynchronous task like a database query
        setTimeout(() => {
	    result.push(1);

	    task.next(); // Go to next task
        }, 2000);
    })
    .do((task) => {
        console.log('Do something 2');
        result.push(2);

        task.next(); // Go to next
    })
    .do((task) => {
        console.log('Do something 3');
        result.push(3);

        task.next(); // Go to next task
    })
    .exec((err) => {
	if (err) {
	    console.log(err);
	}
	else {
            console.log('All tasks finished!');
	    console.log('Result expected: [1, 2, 3]');
            console.log('Result:', result);
	}
    });
```

## do(callback) - async usage
Do Async it's a list of tasks that you can create to execute without order. When all tasks was finished, the tesk go to callback in exec function. All tasks will be executed at same time (but not in parallel like a thread).

```javascript
const tesk = require('tesk');
const result = new Array();

tesk()
    .do((task) => {
        console.log('Do something 1');

        // Simulating a asynchronous task like a database query
        setTimeout(() => {
	    result.push(1);

	    task.next(); // Go to next task
        }, 2000);
    })
    .do((task) => {
        console.log('Do something 2');
        result.push(2);

        task.next(); // Go to next task
    })
    .do((task) => {
        console.log('Do something 3');
        result.push(3);

        task.next(); // Go to next task
    })
    .execAsync((err) => {
	if (err) {
	    console.log(err);
	}
	else {
            console.log('All tasks finished!');
	    console.log('Result expected: [2, 3, 1]');
            console.log('Result:', result);
	}
    });
```

## forEach(array, callback) - sync usage
ForEach sync is for iterate an array in sequence item by item and wait the current task finish to go to next item on array. When all tasks was finished, the tesk go to callback in exec function.

```javascript
const tesk = require('tesk');
const result = new Array();

tesk()
    .forEach([1, 2, 3, 4], (elem, index, task) => {
        if (index == 2) {
            setTimeout(() => {
	        result.push(elem);
	        task.next(); // Go to next task/item
            }, 1);
        }
        else {
             result.push(elem);
            task.next(); // Go to next task/item
        }
    })
    .exec((err) => {
        if (err) {
	    console.log(err);
	}
	else {
            console.log('All tasks finished!');
	    console.log('Result expected: [1, 2, 3, 4]');
            console.log('Result:', result);
	}
    });
```

## forEach(array, callback) - async usage
ForEach async is for iterate an array without order. When all tasks was finished, the tesk go to callback in exec function. All tasks will be executed at same time (but not in parallel like a thread).

```javascript
const tesk = require('tesk');
const result = '';

tesk()
    .forEach([1, 2, 3, 4], (elem, index, task) => {
        if (index == 2) {
            setTimeout(() => {
	        result += elem;
	        task.next(); // Go to next task/item
            }, 1);
        }
        else {
            result += elem;
            task.next();
        }
    })
    .execAsync((err) => {
    	if (err) {
	    console.log(err);
	}
	else {
            console.log('All tasks finished!');
	    console.log('Result expected: [1, 2, 4, 3]');
            console.log('Result:', result);
	}
    });
```

## Accept a task
To accept a task just call the method next() from parameter task received on callback function. Error is null if all tasks was accepted.

```javascript
tesk()
    .do((task) => {
	task.next(); // Go to next task
    })
    .exec((err) => {
        if (err) {
	    console.log(err);
	}
	else {
            console.log('All tasks finished!');
	}
    });
```

## Reject a task
To reject a task just call the method reject() from parameter task received on callback function. When a task was rejected all tasks will be canceled and the callback function receive a personalized argument error.

```javascript
tesk()
    .do((task) => {
	task.reject('Error on execute query'); // Reject task and send a personalized error
    })
    .exec((err) => {
    	if (err) {
	    console.log(err);
	}
	else {
            console.log('All tasks finished!');
	}
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
