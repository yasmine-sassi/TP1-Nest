import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { UserModule } from '../user/user.module';
import { SkillModule } from '../skill/skill.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CvEntity]), // Provides CvRepository
    UserModule, // If you need UserRepository in CvService
    SkillModule, // If you need SkillRepository in CvService
  ],
  controllers: [CvController],
  providers: [CvService],
  exports: [CvService, TypeOrmModule], // Export both service and TypeORM module
})
export class CvModule {}
