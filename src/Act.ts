import { AnyTask } from './Tasks';

type CallbackFunc = () => void;

export class Act {
	private completionCallbackList: Array<CallbackFunc>;
	private startCallbackList: Array<CallbackFunc>;

	private task?: AnyTask;

	private playing: boolean;
	private completed: boolean;

	/**
	 * Creates an {@link Act}.
	 *
	 * @param name - A name for the {@link Act}.
	 */
	constructor(private name: string) {
		this.completionCallbackList = new Array();
		this.startCallbackList = new Array();

		this.playing = false;
		this.completed = false;
	}

	/**
	 * Plays the {@link Act}.
	 *
	 * @remarks
	 * This will call every function passed to {@link Act.onStart}.
	 *
	 * @throws
	 * Thrown if the {@link Act} has already completed.
	 *
	 * @throws
	 * Thrown if the {@link Act} is currently playing.
	 */
	play() {
		assert(!this.completed, 'This act has already completed');
		assert(!this.playing, 'This act is currently playing');

		const task = this.task;
		const startCallbackList = this.startCallbackList;

		this.playing = true;

		for (const callback of startCallbackList) {
			callback();
		}

		if (task) {
			task.onCompletion(() => {
				this.complete();
			});

			task.start();
		}
	}

	/**
	 * Completes the {@link Act}.
	 *
	 * @remarks
	 * This will call every function passed to {@link Act.onCompletion}.
	 *
	 * @throws
	 * Thrown if the {@link Act} has already completed.
	 */
	complete() {
		assert(!this.completed, 'This act has already completed');

		const completionCallbackList = this.completionCallbackList;

		this.playing = false;
		this.completed = true;

		for (const callback of completionCallbackList) {
			callback();
		}
	}

	/**
	 * @returns The name of the {@link Act}.
	 */
	getName(): string {
		return this.name;
	}

	/**
	 * @returns A boolean representing the playing status of the {@link Act}.
	 */
	isPlaying(): boolean {
		return this.playing;
	}

	/**
	 * @returns A boolean representing the completion status of the {@link Act}.
	 */
	isComplete(): boolean {
		return this.completed;
	}

	/**
	 * Sets the {@link Act}'s task.
	 * If set, the task will be played as soon as the {@link Act} plays.
	 * If you want multiple tasks in a scene, use something like a {@link ListedTask} or {@link GroupedTask}.
	 *
	 * @param task - Any task which extends {@link BaseTask}.
	 *
	 * @throws
	 * Thrown if a task has already been set in the {@link Act}.
	 */
	setTask(task: AnyTask) {
		assert(this.task === undefined, 'A task has already been set in this Act');

		this.task = task;
	}

	/**
	 * Adds a function to be ran on the {@link Act}'s completion.
	 *
	 * @event
	 *
	 * @param callback - The function to be ran on completion.
	 */
	onCompletion(callback: CallbackFunc) {
		this.completionCallbackList.push(callback);
	}

	/**
	 * Adds a function to be ran when the {@link Act} starts.
	 *
	 * @event
	 *
	 * @param callback - The function to be ran on start.
	 */
	onStart(callback: CallbackFunc) {
		this.startCallbackList.push(callback);
	}
}
