/*
import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CvService{
  constructor(
    @InjectRepository(CvEntity)
 private cvRepository: Repository<CvEntity>)
  {}

  async create(createCvDto: CreateCvDto) :Promise<CvEntity>{
    return await this.cvRepository.save(createCvDto);
  }

  async findAll():Promise<CvEntity[]> {
    return await this.cvRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} cv`;
  }

  update(id: number, updateCvDto: UpdateCvDto) {
    return `This action updates a #${id} cv`;
  }

  delete(id: number) {
    return `This action removes a #${id} cv`;
  }
}
*/


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../Generics/base.service';

@Injectable()
export class CvService extends BaseService<CvEntity> {
 constructor(@InjectRepository(CvEntity) repository: Repository<CvEntity>) {
   super(repository);
 }

 async filterByCriteria(criteria: string, age: number) {
   const qb = this.repository.createQueryBuilder('cv');
   if (criteria) {
     qb.andWhere('cv.name LIKE :crit OR cv.firstname LIKE :crit OR cv.job LIKE :crit', {
       crit: `%${criteria}%`,
     });
   }
   if (age) qb.andWhere('cv.age = :age', { age });

   return qb.getMany();
 }

 async paginate(qb, page: number, limit: number) {
   const [items, total] = await qb.skip((page - 1) * limit).take(limit).getManyAndCount();
   return { items, total, page, limit };
 }
}

