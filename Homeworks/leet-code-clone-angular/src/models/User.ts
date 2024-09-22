export class User{
    id: number;
    firstName: string;
    secondName: string;
    level: UserLevel;
    constructor(
        id: number = 0,
        firstName: string = "",
        secondName: string = "",
        level: UserLevel = UserLevel.None
    ){
        this.id = id;
        this.firstName = firstName;
        this.secondName = secondName;
        this.level = level;
    }
}
export enum UserLevel{
    None = 0,
    Junior = 1,
    Middle = 2,
    Senior = 3,
}