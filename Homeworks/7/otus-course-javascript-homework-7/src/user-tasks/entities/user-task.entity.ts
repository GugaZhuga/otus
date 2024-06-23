import { IUserTask } from "../interfaces/user-tasks.interface";

export class UserTask implements IUserTask {
    id: number;
    userId: number;
    taskId: number;
    constructor(
        id: number,
        userId: number,
        taskId: number
    ){
        this.id = id;
        this.userId = userId;
        this.taskId = taskId;
    }
}
