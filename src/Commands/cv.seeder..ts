import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../user/user.service';
import { SkillService } from '../skill/skill.service';
import { CvService } from '../cv/cv.service';
import {
  randFirstName,
  randLastName,
  randJobTitle,
  randNumber,
  randUuid,
  randEmail,
  randPassword,
  randSkill
} from '@ngneat/falso';
/*
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userService = app.get(UserService);
  const cvService = app.get(CvService);
  const skillService = app.get(SkillService);

  console.log('🌱 Seeding database...');

  // 1. Créer des skills
  const skillNames = [...new Set(Array.from({ length: 10 }, () => randSkill()))];
  const skills = await Promise.all(
    skillNames.map((designation) => skillService.create({ designation }))
  );

  // 2. Créer des users
  const users = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      userService.create({
        username: randFirstName().toLowerCase() + randNumber({ min: 1, max: 99 }),
        email: randEmail(),
        password: randPassword(),
      }),
    ),
  );

  // 3. Créer des CVs
  await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      const user = users[randNumber({ min: 0, max: users.length - 1 })];
      const selectedSkills = skills
        .sort(() => 0.5 - Math.random())
        .slice(0, randNumber({ min: 1, max: 3 }));

      return cvService.create({
        name: randLastName(),
        firstname: randFirstName(),
        age: randNumber({ min: 20, max: 60 }),
        cin: randUuid(),
        job: randJobTitle(),
        path: 'cv.pdf',
        user,
        skills: selectedSkills,
      });
    }),
  );

  console.log('✅ Done seeding!');
  await app.close();
}
bootstrap();

 */
