import { Injectable } from '@nestjs/common';
import { CreateUserTaskDto } from './dto/create-user-task.dto';
import { UpdateUserTaskDto } from './dto/update-user-task.dto';
import { UserTasksRepository } from './services/user-tasks.repository';

@Injectable()
export class UserTasksService {
  constructor(private readonly userTasksRepository: UserTasksRepository){}
  create(createUserTaskDto: CreateUserTaskDto) {
    return this.userTasksRepository.create(createUserTaskDto);
  }

  findAll() {
    return this.userTasksRepository.findAll();
  }

  findOne(id: number) {
    return this.userTasksRepository.findOne(id);
  }

  update(id: number, updateUserTaskDto: UpdateUserTaskDto) {
    return this.userTasksRepository.update(id, updateUserTaskDto);
  }

  remove(id: number) {
    return this.userTasksRepository.remove(id);
  }
}
