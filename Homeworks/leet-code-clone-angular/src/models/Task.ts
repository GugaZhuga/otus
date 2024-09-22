export class Task{
    id: number;
    name: string;
    complexity: TaskComplexity;
    tagIds: number[];
    popularity: number;
    code: string;
    constructor(
        id: number = 0,
        name: string = "",
        complexity: TaskComplexity = TaskComplexity.None,
        popularity: number = 0,
        tagIds: number[] = [],
        code: string = ""
    ){
        this.id = id;
        this.name = name;
        this.complexity = complexity;
        this.popularity = popularity;
        this.tagIds = tagIds;
        this.code = code;
    }
}
export enum TaskComplexity{
    None = 0,
    Junior = 1,
    JuniorPlus = 2,
    Middle = 3,
    MiddlePlus = 4,
    Senior = 5,
    SeniorPlus = 6
}