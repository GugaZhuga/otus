import { ITask } from "../interfaces/tasks.interface";

export class Task implements ITask{
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
