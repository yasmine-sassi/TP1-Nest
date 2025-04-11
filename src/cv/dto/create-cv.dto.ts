import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import {User} from "../../user/entities/user.entity";
import {Skill} from "../../skill/entities/skill.entity";

export class CreateCvDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(15)
  @Max(65)
  age: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  cin: number;

  @IsNotEmpty()
  @IsString()
  job: string;

  @IsOptional()
  @IsString()
  path: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;  // Only the ID, not the whole User object.

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  skillIds: number[];
}
