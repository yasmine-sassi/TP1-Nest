import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../user/user.service';
import { SkillService } from '../skill/skill.service';
import { CvService } from '../cv/cv.service';
import {
  randEmail,
  randFirstName,
  randJobTitle,
  randLastName,
  randNumber,
  randPassword,
  randFilePath,
  randSkill,
} from '@ngneat/falso';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateSkillDto } from '../skill/dto/create-skill.dto';
import { CreateCvDto } from '../cv/dto/create-cv.dto';
import { User } from '../user/entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userService = app.get(UserService);
  const skillService = app.get(SkillService);
  const cvService = app.get(CvService);

  const users: { user: User; firstname: string; lastname: string; cin: number }[] = [];

  // 🌱 Seed Users (with first/last name and cin for CV consistency)
  for (let i = 0; i < 5; i++) {
    const firstname = randFirstName();
    const lastname = randLastName();
    const cin = randNumber({ min: 10000000, max: 99999999 }[0]);

    const userDto: CreateUserDto = {
      username: firstname.toLowerCase() + randNumber({ min: 1, max: 99 }[0]),
      password : randPassword({ length: 12 }), // generates a 12-character password
    };

    const user = await userService.create(userDto);
    users.push({ user, firstname, lastname, cin });
  }

  // 🌱 Seed Skills
  const skills: Skill[] = [];
  for (let i = 0; i < 10; i++) {
    const skillDto: CreateSkillDto = {
      designation: randSkill(),
    };
    const skill = await skillService.create(skillDto);
    skills.push(skill);
  }

  // 🌱 Seed CVs
  for (let i = 0; i < 10; i++) {
    const userData = users[Math.floor(Math.random() * users.length)];
    const randomSkills = skills.sort(() => 0.5 - Math.random()).slice(0, 3);

    const cvDto: CreateCvDto = {
      name: userData.lastname,
      firstname: userData.firstname,
      age: randNumber({ min: 18, max: 60 }[0]),
      cin: userData.cin,
      job: randJobTitle(),
      path: randFilePath(),
      userId: userData.user.id, // Important: Pass full user object (not just ID)
      skillIds: randomSkills.map((s) => s.id), // randomSkills est un tableau de Skill, donc chaque élément a un id
    };

    await cvService.create(cvDto);
  }

  await app.close();
}

bootstrap();



