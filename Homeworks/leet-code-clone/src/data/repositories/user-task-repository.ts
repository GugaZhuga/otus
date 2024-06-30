import { Injectable } from "@nestjs/common";
import { IUserTask } from "src/interfaces/user-task";
import { DataSource } from "typeorm";
import { dataSource } from "../database";
import { UserTaskEntity } from "../entities/user-task-map";

@Injectable()
export class UserTaskRepository{
    dataSource: DataSource = dataSource;
    private userTasks() {
        return dataSource.getRepository(UserTaskEntity);
    }
    async create(userTask: Partial<IUserTask>){
        return await this.userTasks().save(this.userTasks().create(userTask));
    }
    async findAll(){
        return await this.userTasks().find();
    }
    async findOne(id: number){
        return await this.userTasks().findOneBy({id: id});
    }
    async update(id: number, userTask: Partial<IUserTask>){
        return await this.userTasks().update(id, userTask);
    }
    async remove(id: number){
        return await this.userTasks().remove(await this.userTasks().findOneBy({id: id}));
    }
}