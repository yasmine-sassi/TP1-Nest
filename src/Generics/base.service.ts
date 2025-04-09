import {
  Repository,
  FindOptionsWhere,
  DeepPartial,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

@Injectable()
export class BaseService<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
    });
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T | null> {
    await this.repository.update(id, data as any);
    return this.findOne(id);
  }

  async delete(id: number): Promise<T | null> {
    const item = await this.findOne(id);
    if (!item) return null;
    return this.repository.remove(item);
  }
}
