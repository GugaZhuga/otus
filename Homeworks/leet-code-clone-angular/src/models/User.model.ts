import { UserLevel } from "./enums/UserLevel";

export class User{
    constructor(
        public id: number = 0,
        public firstName: string = "",
        public secondName: string = "",
        public level: UserLevel = UserLevel.None
    ){ }
}