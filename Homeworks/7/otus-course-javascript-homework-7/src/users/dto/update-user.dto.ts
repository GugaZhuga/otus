import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    constructor(
        id: number,
        name: string
    ){
        super(id, name);
    }
}
