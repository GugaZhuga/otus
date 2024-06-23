import { IUserTask } from "../interfaces/user-tasks.interface";

export class CreateUserTaskDto implements IUserTask {
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
