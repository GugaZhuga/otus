export class Tag{
    id: number;
    name: string;
    description: string|null;
    constructor(
        id: number = 0,
        name: string = "",
        description: string|null = null
    ){
        this.id = id;
        this.name = name;
        this.description = description;
    }
}