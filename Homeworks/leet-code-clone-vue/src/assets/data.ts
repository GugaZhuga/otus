import { Task, TaskComplexity } from "@/models/Task";
import { User } from "@/models/User";

export async function delay(ms: number = 1000){
    await new Promise(x => setTimeout(x, ms));
}
export const tasks = [
    new Task(1, "First", TaskComplexity.Junior, 1, 1, "using System;\nnamespace Test\n{\n\tpublic class TestClass\n\t{\n\t\tpublic int TestField;\n\t}\n}"),
    new Task(2, "Second", TaskComplexity.Middle, 1),
    new Task(3, "Thrid", TaskComplexity.Senior, 2),
    new Task(4, "Fourth", TaskComplexity.JuniorPlus, 1),
    new Task(4, "Fifth", TaskComplexity.Middle, 3),
];
export async function getTasks(){
    await delay();
    return tasks;
}
export const users = [
    new User(1, "First user", "login", "password"),
    new User(2, "Other user", "other", "pass"),
];
export async function getUsers() {
    await delay();
    return users;
}