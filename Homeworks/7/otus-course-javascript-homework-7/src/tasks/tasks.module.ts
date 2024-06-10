import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksReposiroty } from './services/tasks.repository';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksReposiroty],
})
export class TasksModule {}
