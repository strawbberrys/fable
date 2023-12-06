import { BaseTask, WatchFunc } from './base-task';

export class Task extends BaseTask {
	constructor(protected watchFunc: WatchFunc) {
		super();
	}
}
