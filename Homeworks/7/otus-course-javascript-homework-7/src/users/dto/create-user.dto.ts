import { PartialType } from "@nestjs/mapped-types";
import { IUser } from "../interfaces/users.interface";

export class CreateUserDto implements IUser {
    id: number;
    name: string;
    constructor(
        id: number,
        name: string
    ){
        this.id = id;
        this.name = name;
    }
}
