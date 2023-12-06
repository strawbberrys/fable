export type WatchFunc = (complete: () => void) => void;

export abstract class BaseTask {
	private completionCallbackList: Array<Callback>;
	private startCallbackList: Array<Callback>;

	protected abstract watchFunc: WatchFunc;

	private completed: boolean;
	private running: boolean;

	constructor() {
		this.completionCallbackList = new Array();
		this.startCallbackList = new Array();

		this.completed = false;
		this.running = false;
	}

	complete() {
		assert(!this.completed, 'This task has already completed');

		const completionCallbackList = this.completionCallbackList;

		this.completed = true;
		this.running = false;

		for (const callback of completionCallbackList) {
			callback();
		}
	}

	start() {
		assert(!this.running, 'This task is already running');
		assert(!this.completed, 'This task has already completed');

		const startCallbackList = this.startCallbackList;

		this.running = true;

		this.watchFunc(() => {
			this.complete();
		});

		for (const callback of startCallbackList) {
			callback();
		}
	}

	// watcher() {} (THIS WILL REPLACE watchFunc and hopefully be cleaner to implement...)

	isComplete(): boolean {
		return this.completed;
	}

	isRunning(): boolean {
		return this.running;
	}

	onStart(callback: Callback) {
		this.startCallbackList.push(callback);
	}

	onCompletion(callback: Callback) {
		this.completionCallbackList.push(callback);
	}
}
