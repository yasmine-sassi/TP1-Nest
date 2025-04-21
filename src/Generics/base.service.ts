import { Injectable } from '@nestjs/common';
import {In, ObjectLiteral, Repository} from 'typeorm';

@Injectable()
export class BaseService<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(entity: any): Promise<T> {
    return this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<T | null> {
    return this.repository.findOneBy({ id } as any);
  }

  async update(id: number, updateDto: any): Promise<T | null> {
    await this.repository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
  async findByIds(ids: number[]): Promise<T[]> {
    return this.repository.findBy({ id: In(ids) } as any);
  }

}
