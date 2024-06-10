import { Injectable } from '@nestjs/common';
import { IUser } from "../interfaces/users.interface";

@Injectable()
export class UsersRepository {
  #users = [];
  create(user: Partial<IUser>) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, user: Partial<IUser>) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}