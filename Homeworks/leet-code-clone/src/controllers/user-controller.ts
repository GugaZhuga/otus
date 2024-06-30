import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { IUser } from "src/interfaces/user";
import { UserRepository } from "src/data/repositories/user-repository";

@Controller("users")
export class UserController {
    constructor(
        private readonly userRepository: UserRepository
    ){}
    @Post()
    async create(@Body() user: Partial<IUser>){
        return await this.userRepository.create(user);
    }
    @Get()
    async findAll(){
        return await this.userRepository.findAll();
    }
    @Get(":id")
    async findOne(@Param("id") id: number){
        return await this.userRepository.findOne(id);
    }
    @Patch(":id")
    async update(@Param("id") id: number, @Body() user: Partial<IUser>){
        return await this.userRepository.update(id, user);
    }
    @Delete(":id")
    async remove(@Param("id") id: number){
        return await this.userRepository.remove(id);
    }
    @Get(":id/tasks")
    async findTasks(@Param("id") id: number){
        return await this.userRepository.findOne(id).then(async x => await x.tasks);
        /*const tasks = await user.tasks;
        return tasks;*/
    }
}