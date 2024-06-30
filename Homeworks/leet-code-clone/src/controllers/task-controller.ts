import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ITask } from "src/interfaces/task";
import { TaskRepository } from "src/data/repositories/task-repository";

@Controller("tasks")
export class TaskController {
    constructor(
        private readonly taskRepository: TaskRepository
    ){}
    @Post()
    async create(@Body() task: Partial<ITask>){
        return await this.taskRepository.create(task);
    }
    @Get()
    async findAll(){
        return await this.taskRepository.findAll();
    }
    @Get(":id")
    async findOne(@Param("id") id: number){
        return await this.taskRepository.findOne(id);
    }
    @Patch(":id")
    async update(@Param("id") id: number, @Body() task: Partial<ITask>){
        return await this.taskRepository.update(id, task);
    }
    @Delete(":id")
    async remove(@Param("id") id: number){
        return await this.taskRepository.remove(id);
    }
    @Get(":id/users")
    async findUsers(@Param("id") id: number){
        return await this.taskRepository.findOne(id).then(async x => await x.users);
    }
}