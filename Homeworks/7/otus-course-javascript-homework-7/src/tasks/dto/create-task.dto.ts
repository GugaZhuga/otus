import { ITask } from "../interfaces/tasks.interface";

export class CreateTaskDto implements ITask {
    id: number;
    name: string;
    constructor(
        id: number,
        name: string
    ){
        this.id = id;
        this.name = name;
    }
}
