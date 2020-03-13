import {Injectable} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import {UserModel} from "./user-model";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private UserRepository: Repository<UserModel>
  ) {}

  async findAll(): Promise<UserModel[]> {
    return await this.UserRepository.find();
  }
}
