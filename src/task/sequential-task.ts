import { Task } from "./task";
import { Watcher } from "../util";

function createWatcher<T extends Task>(tasks: ReadonlyArray<T>): Watcher {
	let completedTasks = 0;
	const totalTasks = tasks.size();

	const watcher = new Watcher((complete) => {
		for (const task of tasks) {
			const currentThread = coroutine.running();

			task.completed.connect(() => {
				if (++completedTasks === totalTasks) {
					complete();
				} else {
					coroutine.resume(currentThread);
				}
			});

			task.start();

			coroutine.yield();
		}
	});

	return watcher;
}

export class SequentialTask<T extends Task> extends Task {
	constructor(tasks: ReadonlyArray<T>) {
		const watcher = createWatcher(tasks);

		super(watcher);
	}
}
