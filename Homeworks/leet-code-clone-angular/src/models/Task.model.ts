import { TaskComplexity } from "./enums/TaskComplexity";

export class Task{
    constructor(
        public id: number = 0,
        public name: string = "",
        public complexity: TaskComplexity = TaskComplexity.None,
        public popularity: number = 0,
        public tagIds: number[] = [],
        public code: string = ""
    ){ }
}