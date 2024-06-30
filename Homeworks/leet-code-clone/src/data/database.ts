import { DataSource, DataSourceOptions } from "typeorm";
import { TaskEntity, } from "./entities/task-map";
import { UserEntity } from "./entities/user-map";
import { UserTaskEntity } from "./entities/user-task-map";

const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "leetcode_clone",
    //entities: [userMap, taskMap, userTaskMap],
    entities: [UserEntity, TaskEntity, UserTaskEntity],
    migrations: ["./migrations/**"],
    migrationsTableName: "migrations_history",
}
export const dataSource: DataSource = new DataSource(dataSourceOptions);