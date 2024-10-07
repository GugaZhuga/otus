import { Task, TaskComplexity } from "../models/Task.model";
import { User } from "../models/User.model";

export async function delay(ms: number = 1000){
    await new Promise(x => setTimeout(x, ms));
}
export const users: User[] = [
    new User(1, "Test1"),
    new User(2, "Test2"),
];
export const tasks: Task[] = [
    new Task(1, "Task1"),
    new Task(2, "Task2", TaskComplexity.Senior),
    new Task(3, "Task3", TaskComplexity.Junior),
];
export const complexities: [string, TaskComplexity][] = Object.entries(TaskComplexity).filter(x => typeof(x[1]) === "number").map(x => [x[0], x[1] as TaskComplexity]);
