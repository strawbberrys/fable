type CallbackFunc = () => void;
export type WatchFunc = (complete: () => void) => void;

export abstract class BaseTask {
	private completionCallbackList: Array<CallbackFunc>;
	private startCallbackList: Array<CallbackFunc>;

	protected abstract watchFunc: WatchFunc;

	private completed: boolean;
	private running: boolean;

	constructor() {
		this.completionCallbackList = new Array();
		this.startCallbackList = new Array();

		this.completed = false;
		this.running = false;
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

	complete() {
		assert(!this.completed, 'This task has already completed');

		const completionCallbackList = this.completionCallbackList;

		this.completed = true;
		this.running = false;

		for (const callback of completionCallbackList) {
			callback();
		}
	}

	isComplete(): boolean {
		return this.completed;
	}

	isRunning(): boolean {
		return this.running;
	}

	onStart(callback: CallbackFunc) {
		this.startCallbackList.push(callback);
	}

	onCompletion(callback: CallbackFunc) {
		this.completionCallbackList.push(callback);
	}
}
