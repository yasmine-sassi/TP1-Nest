import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../Generics/base.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { User } from '../user/entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';

@Injectable()
export class CvService extends BaseService<CvEntity> {
  constructor(
    @InjectRepository(CvEntity)
    protected readonly repository: Repository<CvEntity>,
  ) {
    super(repository);
  }

  async create(createCvDto: CreateCvDto): Promise<CvEntity> {
    const { userId, skillIds, ...cvData } = createCvDto;

    const cv = this.repository.create(cvData);

    // Handle user relationship
    if (userId) {
      cv.user = { id: userId } as User;
    }

    // Handle skills relationship
    if (skillIds && skillIds.length > 0) {
      cv.skills = skillIds.map((id) => ({ id }) as Skill);
    }

    return this.repository.save(cv);
  }

  async findAll(): Promise<CvEntity[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<CvEntity> {
    const cv = await this.repository.findOneBy({ id });
    if (!cv) {
      throw new NotFoundException(`CV with ID ${id} not found`);
    }
    return cv;
  }

  async update(id: number, updateCvDto: UpdateCvDto): Promise<CvEntity> {
    await this.repository.update(id, updateCvDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`CV with ID ${id} not found`);
    }
  }

  async filterByCriteria(criteria: string, age?: number): Promise<CvEntity[]> {
    const qb = this.repository.createQueryBuilder('cv');
    if (criteria) {
      qb.andWhere(
        'cv.name LIKE :crit OR cv.firstname LIKE :crit OR cv.job LIKE :crit',
        { crit: `%${criteria}%` },
      );
    }
    if (age) {
      qb.andWhere('cv.age = :age', { age });
    }
    return qb.getMany();
  }

  async paginate(
    qb: any,
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    items: CvEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    const [items, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { items, total, page, limit };
  }
}
