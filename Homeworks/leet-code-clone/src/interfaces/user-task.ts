import { IIdentifiable } from "./identifiable";

export interface IUserTask extends IIdentifiable {
    userId: number;
    taskId: number;
}