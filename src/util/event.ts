export class Event {
	private callbacks: Array<Callback>;

	constructor() {
		this.callbacks = new Array<Callback>();
	}

	public connect(callback: Callback) {
		this.callbacks.push(callback);
	}

	public fire() {
		for (const callback of this.callbacks) {
			callback();
		}
	}
}

// This needs to be expanded.
