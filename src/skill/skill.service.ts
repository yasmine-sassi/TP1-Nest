import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import {User} from "../user/entities/user.entity";
import {BaseService} from "../Generics/base.service";

@Injectable()
export class SkillService extends BaseService<Skill>{
  constructor(@InjectRepository(Skill) repository: Repository< Skill>) {
    super(repository);
  }


}
