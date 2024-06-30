import { Module } from "@nestjs/common";
import { TaskController } from "src/controllers/task-controller";
import { TaskRepository } from "src/data/repositories/task-repository";

@Module({
    controllers: [TaskController],
    providers: [TaskRepository],
})
export class TaskModule {}