export async function delay(ms: number = 1000){
    await new Promise(x => setTimeout(x, ms));
}
import { Tag } from "./models/Tag";
import { Task, TaskComplexity } from "./models/Task";
import { User, UserLevel } from "./models/User";
export const tasks: Task[] = [
    new Task(1, "First task", TaskComplexity.Junior, 1, [1], "using System;"),
    new Task(2, "Second task", TaskComplexity.Middle, 5, [], "const constant: number = 5"),
];
export const users: User[] = [
    new User(1, "Giorgio", "Bazhenni", UserLevel.Junior),
    new User(2, "Test", "User", UserLevel.Middle),
];
export const tags : Tag[] = [
    new Tag(1, "First tag", "Test description"),
    new Tag(2, "Second tag"),
    new Tag(3, "Thrid tag"),
    new Tag(4, "Fourth tag"),
];