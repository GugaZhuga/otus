import { IUser } from "../interfaces/user";
import { Task } from "./task";
import { UserTask } from "./user-task";

export class User implements IUser{
    id: number;
    name: string;
    tasks: UserTask[];
}