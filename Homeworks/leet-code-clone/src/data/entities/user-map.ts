import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { IUser } from "src/interfaces/user";
import { UserTaskEntity } from "./user-task-map";

@Entity("users")
export class UserEntity implements IUser{
    @PrimaryColumn({name: "id", type: "integer", nullable: false})
    id: number;
    @Column({name: "name", type: "character varying", nullable: false})
    name: string;
    @OneToMany(x => UserTaskEntity, x => x.user)
    tasks: Promise<UserTaskEntity[]>;
}