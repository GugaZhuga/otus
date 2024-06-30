import { Module } from "@nestjs/common";
import { UserController } from "src/controllers/user-controller";
import { UserRepository } from "src/data/repositories/user-repository";

@Module({
    controllers: [UserController],
    providers: [UserRepository],
})
export class UserModule {}