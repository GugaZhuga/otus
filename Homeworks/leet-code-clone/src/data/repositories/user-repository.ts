import { Injectable } from "@nestjs/common";
import { IUser } from "src/interfaces/user";
import { DataSource } from "typeorm";
import { dataSource } from "../database";
import { UserEntity } from "../entities/user-map";

@Injectable()
export class UserRepository {
    dataSource: DataSource = dataSource;
    constructor(){}
    private users() {
        return this.dataSource.getRepository(UserEntity);
    }
    async create(user: Partial<IUser>){
        return await this.users().save(this.users().create(user));
    }
    async findAll(){
        return await this.users().find();
    }
    async findOne(id: number){
        return await this.users().findOneBy({id: id});
    }
    async update(id: number, user: Partial<IUser>){
        return await this.users().update(id, user);
    }
    async remove(id: number){
        return await this.users().remove(await this.users().findOneBy({id: id}));
    }
}