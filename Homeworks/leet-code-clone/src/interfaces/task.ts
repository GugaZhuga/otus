import { IIdentifiable } from "./identifiable";

export interface ITask extends IIdentifiable{
    name: string;
    description: string;
}