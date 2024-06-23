import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTaskDto } from './create-user-task.dto';

export class UpdateUserTaskDto extends PartialType(CreateUserTaskDto) {
    constructor(
        id: number,
        userId: number,
        taskId: number
    ){
        super(id, userId, taskId);
    }
}
