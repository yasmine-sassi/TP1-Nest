import {MiddlewareConsumer, Module, NestModule, ParseIntPipe} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { User } from './user/entities/user.entity';
import { CvEntity } from './cv/entities/cv.entity';
import { Skill } from './skill/entities/skill.entity';
import {AuthMiddleware} from "src/middelwares/auth.middleware";

dotenv.config();
@Module({
  imports: [
    CvModule,
    SkillModule,
    UserModule,
    TypeOrmModule.forFeature([User, CvEntity, Skill]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthMiddleware)
        .forRoutes('v2/cv'); // S'applique uniquement à la version 2 du contrôleur Cv
  }
}
