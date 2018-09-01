class Next {

	tasks: any[];
	taskObj: any;
	finallyFunction: any;
	catchFunction: any;
	forEachFunction: any;
	forEachArray: any[];
	currentTask: number;

	constructor() {
		this.tasks = new Array();
		this.forEachArray = new Array();
		this.currentTask = -1;
	}

	do(task: any): Next {
		this.tasks.push(task);
		return this;
	}

	forEach(array: any[], callback: any) {
		this.forEachArray = array;
		this.forEachFunction = callback;
		return this;
	}

	finally(callback: any): Next {
		this.finallyFunction = callback;
		return this;
	}

	catch(callback: any): Next {
		this.catchFunction = callback;
		return this;
	}

	exec() {
		if (this.forEachFunction) {
			this.setTaskObj(() => this.execForEach());
			this.execForEach();
		}
		else {
			this.setTaskObj(() => this.execTask());
			this.execTask();
		}
	}

	execAsync() {
		if (this.forEachFunction) {
			this.setTaskObj(() => {
				this.currentTask++;
				if (this.currentTask == this.forEachArray.length - 1) {
					this.finallyFunction();
				}
			});
			this.execAsyncForEach();
		}
		else {
			this.setTaskObj(() => {
				this.currentTask++;
				if (this.currentTask == this.tasks.length - 1) {
					this.finallyFunction();
				}
			});
			this.execAsyncTask();
		}
	}

	private execTask() {
		this.currentTask++;

		if (this.currentTask == this.tasks.length) {
			this.finallyFunction();
		}
		else {
			this.tasks[this.currentTask](this.taskObj);
		}
	}

	private execAsyncTask() {
		this.tasks.forEach((task: any) => {
			task(this.taskObj);
		});
	}

	private execForEach() {
		this.currentTask++;
		if (this.currentTask == this.forEachArray.length) {
			this.finallyFunction();
		}
		else {
			this.forEachFunction(this.forEachArray[this.currentTask], this.currentTask, this.taskObj);
		}
	}

	private execAsyncForEach() {
		this.forEachArray.forEach((elem: any, index: any) => {
			this.forEachFunction(elem, index, this.taskObj);
		});
	}

	private setTaskObj(execFunction: any) {
		this.taskObj = new Object();
		this.taskObj.next = execFunction;
		this.taskObj.reject = this.catchFunction;
	}

}

function next() {
	return new Next();
}

export { next };

