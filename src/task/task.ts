import { Event } from "../util";
import { Watcher } from "../util";

export class Task {
	private readonly watcher?: Watcher;

	private _isCompleted: boolean;
	private _isRunning: boolean;

	public readonly completed: Event;
	public readonly started: Event;

	constructor(watcher?: Watcher) {
		this.watcher = watcher;

		this._isCompleted = false;
		this._isRunning = false;

		this.completed = new Event();
		this.started = new Event();
	}

	public complete() {
		this.completed.fire();

		this._isCompleted = true;
		this._isRunning = false;
	}

	public start() {
		this.watcher?.watch(() => {
			this.complete();
		});

		this.started.fire();

		this._isRunning = true;
	}

	public isCompleted(): boolean {
		return this._isCompleted;
	}

	public isRunning(): boolean {
		return this._isRunning;
	}
}
