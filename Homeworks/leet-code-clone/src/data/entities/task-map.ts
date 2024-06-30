import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { ITask } from "src/interfaces/task";
import { UserTaskEntity } from "./user-task-map";

@Entity("tasks")
export class TaskEntity implements ITask{
    @PrimaryColumn({name: "id", type: "integer", nullable: false})
    id: number;
    @Column({name: "name", type: "character varying", nullable: false})
    name: string;
    @Column({name: "description", type: "character varying", nullable: true})
    description: string;
    @OneToMany(x => UserTaskEntity, x => x.task)
    users: Promise<UserTaskEntity[]>
}