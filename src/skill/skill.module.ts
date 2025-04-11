import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])], // This provides the SkillRepository
  controllers: [SkillController],
  providers: [SkillService],
  exports: [SkillService, TypeOrmModule], // Export both service and TypeORM module
})
export class SkillModule {}
