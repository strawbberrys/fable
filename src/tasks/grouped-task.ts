import { BaseTask, WatchFunc } from './base-task';
import type { AnyTask } from '.';

type TaskCallback = (task: AnyTask) => void;

export class GroupedTask extends BaseTask {
	private readonly tasks: ReadonlyArray<AnyTask>;
	protected readonly watchFunc: WatchFunc;

	private taskCompletionCallbackList: Array<TaskCallback>;

	constructor(tasks: ReadonlyArray<AnyTask>) {
		super();

		this.watchFunc = (complete) => {
			let completedTasks = 0;

			const taskCompletionCallbackList = this.taskCompletionCallbackList;
			const totalTasks = tasks.size();

			for (const task of tasks) {
				task.onCompletion(() => {
					for (const callback of taskCompletionCallbackList) {
						callback(task);
					}

					if (++completedTasks === totalTasks) {
						complete();
					}
				});
			}
		};

		this.tasks = tasks;
		this.taskCompletionCallbackList = new Array();
	}

	public getTasks(): ReadonlyArray<{ task: AnyTask; complete: boolean; num: number }> {
		return this.tasks.map((task, index) => {
			return { task: task, complete: task.isComplete(), num: index };
		});
	}

	public onTaskCompletion(callback: TaskCallback) {
		this.taskCompletionCallbackList.push(callback);
	}
}
