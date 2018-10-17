# tesk
It's a a powerful and simple [node](http://nodejs.org) module to execute synchronous tasks or asynchronous tasks.

## Installation

```bash
$ npm install tesk
```

## Basic usage

```javascript
const tesk = require('tesk');
const resultSync = new Array();
const resultAsync = new Array();

/**
 * Execute sync
 */
tesk()
	.do((task) => {
		console.log('Do something 1');

		// Simulating a asynchronous task like a database query
		setTimeout(() => {
			resultSync.push("task 1");
		}, 2000);

		task.next();
	})
	.do((task) => {
		console.log('Do something 2');
		resultSync.push("task 2");

		task.next();
	})
	.do((task) => {
		console.log('Do something 3');
		resultSync.push("task 3");
		
		task.next();
	})
	.exec((err) => {
		console.log('All tasks finished!');
		console.log('Results:', resultSync);
	});

/**
 * Execute async
 */
tesk()
	.do((task) => {
		console.log('Do something 1');

		// Simulating a asynchronous task like a database query
		setTimeout(() => {
			resultAsync.push("task 1");

			task.next();
		}, 2000);
	})
	.do((task) => {
		console.log('Do something 2');
		resultAsync.push("task 2");

		task.next();
	})
	.do((task) => {
		console.log('Do something 3');
		resultAsync.push("task 3");
		
		task.next();
	})
	.execAsync((err) => {
		console.log('All tasks finished!');
		console.log('Results:', resultAsync);
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
