import { IUser } from "../interfaces/users.interface";
export class User implements IUser {
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
