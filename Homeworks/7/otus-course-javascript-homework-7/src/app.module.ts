import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { UserTasksModule } from './user-tasks/user-tasks.module';

@Module({
  imports: [UsersModule, TasksModule, UserTasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
