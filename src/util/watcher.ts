export type CompletionFunction = () => void;
export type WatchFunction = (complete: CompletionFunction) => void;

export class Watcher {
	private readonly watchFunction: WatchFunction;

	constructor(watchFunction: WatchFunction) {
		this.watchFunction = watchFunction;
	}

	public watch(completionFunction: CompletionFunction) {
		this.watchFunction(completionFunction);
	}
}
