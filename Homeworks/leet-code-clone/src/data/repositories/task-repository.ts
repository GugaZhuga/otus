import { Injectable } from "@nestjs/common";
import { ITask } from "src/interfaces/task";
import { DataSource } from "typeorm";
import { dataSource } from "../database";
import { TaskEntity } from "../entities/task-map";

@Injectable()
export class TaskRepository{
    dataSource: DataSource = dataSource;
    constructor(){}
    private tasks() {
        return this.dataSource.getRepository(TaskEntity);
    }
    async create(task: Partial<ITask>){
        return await this.tasks().save(this.tasks().create(task));
    }
    async findAll(){
        return await this.tasks().find();
    }
    async findOne(id: number){
        return await this.tasks().findOneBy({id: id});
    }
    async update(id: number, task: Partial<ITask>){
        return await this.tasks().update(id, task);
    }
    async remove(id: number){
        return await this.tasks().remove(await this.tasks().findOneBy({id: id}));
    }
}