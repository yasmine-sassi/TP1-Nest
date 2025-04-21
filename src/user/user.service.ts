import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {BaseService} from "../Generics/base.service";
@Injectable()
export class UserService extends BaseService<User>{
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

}