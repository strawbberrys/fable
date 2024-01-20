import { Event } from "./util";
import type { Task } from "./task";

export class Act<N extends string = string, T extends Task | undefined = undefined> {
	public readonly name: N;
	private readonly task?: T;

	private _isCompleted: boolean;
	private _isPlaying: boolean;

	public readonly completed: Event;
	public readonly playing: Event;

	constructor(name: N, task?: T) {
		this.name = name;
		this.task = task;

		this._isCompleted = false;
		this._isPlaying = false;

		this.completed = new Event();
		this.playing = new Event();
	}

	public complete() {
		assert(!this._isCompleted, "Attempt to complete an Act that has already completed");
		assert(this._isPlaying, "Attempt to complete an Act that is not playing");

		this.completed.fire();

		this._isCompleted = true;
		this._isPlaying = false;
	}

	public play() {
		assert(!this._isCompleted, "Attempt to play an Act that has already completed"); // Don't think there's any reason to not allow this?
		assert(!this._isPlaying, "Attempt to play an Act that is already playing");

		const task = this.task;

		if (task) {
			task.completed.connect(() => {
				this.complete();
			});

			task.start();
		}

		this.playing.fire();

		this._isPlaying = true;
	}

	public isCompleted(): boolean {
		return this._isCompleted;
	}

	public isPlaying(): boolean {
		return this._isPlaying;
	}
}
