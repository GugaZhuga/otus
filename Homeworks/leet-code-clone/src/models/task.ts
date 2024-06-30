import { ITask } from "../interfaces/task";
import { User } from "./user";
import { UserTask } from "./user-task";

export class Task implements ITask{
    id: number;
    name: string;
    description: string;
    userId: number;
    user: UserTask;
}