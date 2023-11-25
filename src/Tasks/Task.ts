import { BaseTask, WatchFunc } from './BaseTask';

export class Task extends BaseTask {
	constructor(protected watchFunc: WatchFunc) {
		super();
	}
}
