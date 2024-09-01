export class Task{
    id: number;
    name: string;
    complexity: TaskComplexity;
    categoryId: number|null;
    popularity: number;
    code: string;
    constructor(
        id: number,
        name: string,
        complexity: TaskComplexity = TaskComplexity.None,
        cateroryId: number|null = null,
        popularity: number = 0,
        code: string = ""
    ){
        this.id = id;
        this.name = name;
        this.complexity = complexity;
        this.categoryId = cateroryId;
        this.popularity = popularity;
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