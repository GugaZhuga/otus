import { IUserTask } from "../interfaces/user-task";
import { Task } from "./task";
import { User } from "./user";

export class UserTask implements IUserTask {
    id: number;
    userId: number;
    taskId: number;
    task: Task;
    user: User;
}