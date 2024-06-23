import { Injectable } from "@nestjs/common";
import { IUserTask } from "../interfaces/user-tasks.interface";

@Injectable()
export class UserTasksRepository {
    create(userTask: Partial<IUserTask>) {
        return 'This action adds a new userTask';
    }

    findAll() {
        return `This action returns all userTasks`;
    }

    findOne(id: number) {
        return `This action returns a #${id} userTask`;
    }

    update(id: number, userTask: Partial<IUserTask>) {
        return `This action updates a #${id} userTask`;
    }

    remove(id: number) {
        return `This action removes a #${id} userTask`;
    }
    }