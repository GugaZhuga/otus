import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    constructor(
        id: number,
        name: string
    ){
        super(id, name);
    }
}
