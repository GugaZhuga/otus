import { Module } from '@nestjs/common';
import { UserTasksService } from './user-tasks.service';
import { UserTasksController } from './user-tasks.controller';
import { UserTasksRepository } from './services/user-tasks.repository';

@Module({
  controllers: [UserTasksController],
  providers: [UserTasksService, UserTasksRepository],
})
export class UserTasksModule {}
