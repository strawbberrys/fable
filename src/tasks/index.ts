import { Task } from './task';
import { GroupedTask } from './grouped-task';
import { ListedTask } from './listed-task';

export { Task, GroupedTask, ListedTask };

export type AnyTask = Task | GroupedTask | ListedTask;
