import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksReposiroty } from './services/tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksReposiroty){}
  create(createTaskDto: CreateTaskDto) {
    return this.tasksRepository.create(createTaskDto);
  }

  findAll() {
    return this.tasksRepository.findAll();
  }

  findOne(id: number) {
    return this.tasksRepository.findOne(id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
