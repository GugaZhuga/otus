import { Injectable } from "@nestjs/common";
import { ITask } from "../interfaces/tasks.interface";

@Injectable()
export class TasksReposiroty {
    create(task: Partial<ITask>) {
        return 'This action adds a new task';
    }

    findAll() {
        return `This action returns all tasks`;
    }

    findOne(id: number) {
        return `This action returns a #${id} task`;
    }

    update(id: number, task: Partial<ITask>) {
        return `This action updates a #${id} task`;
    }

    remove(id: number) {
        return `This action removes a #${id} task`;
    }
}