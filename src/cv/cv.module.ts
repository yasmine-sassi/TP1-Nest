import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { UserModule } from '../user/user.module';
import { SkillModule } from '../skill/skill.module';
import {FileUploadModule} from "src/file-upload/file-upload.module";
import {User} from "src/user/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([CvEntity,User]), // Provides CvRepository
    UserModule,
    SkillModule,
    FileUploadModule

  ],
  controllers: [CvController],
  providers: [CvService],
  exports: [CvService, TypeOrmModule],
})
export class CvModule {}
