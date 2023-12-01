import { Task } from './Task';
import { GroupedTask } from './GroupedTask';
import { ListedTask } from './ListedTask';

export { Task, GroupedTask, ListedTask };

export type AnyTask = Task | GroupedTask | ListedTask;
