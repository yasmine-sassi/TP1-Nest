import { Module, ParseIntPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config()
@Module({
  imports: [CvModule, SkillModule, UserModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host:process.env.DB_HOST,
      //port: parseInt(process.env.DB_PORT) jsp pq ca ne marche pas
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
