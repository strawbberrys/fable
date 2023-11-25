import { BaseTask, WatchFunc } from './BaseTask';
import { AnyTask } from '.';

type TaskCallbackFunc = (task: AnyTask) => void;

export class GroupedTask extends BaseTask {
	protected taskCompletionCallbackList: Array<TaskCallbackFunc>;
	protected watchFunc: WatchFunc;

	constructor(private tasks: ReadonlyArray<AnyTask>) {
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

		this.taskCompletionCallbackList = new Array();
	}

	getTasks(): ReadonlyArray<{ task: AnyTask; complete: boolean; num: number }> {
		return this.tasks.map((task, index) => {
			return { task: task, complete: task.isComplete(), num: index };
		});
	}

	onTaskCompletion(callback: TaskCallbackFunc) {
		this.taskCompletionCallbackList.push(callback);
	}
}
