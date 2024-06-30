import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { IUserTask } from "src/interfaces/user-task";
import { TaskEntity } from "./task-map";
import { UserEntity } from "./user-map";

@Entity("userTasks")
export class UserTaskEntity implements IUserTask{
    @PrimaryColumn({name: "id", type: "integer", nullable: false})
    id: number;
    @Column()
    taskId: number;
    @Column()
    userId: number;
    @JoinColumn({name: "taskId"})
    @OneToOne(x => TaskEntity)
    task: Promise<TaskEntity>;
    @JoinColumn({name: "userId"})
    @OneToOne(x => UserEntity)
    user: Promise<UserEntity>;
}