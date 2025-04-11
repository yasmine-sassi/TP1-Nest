import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from './create-skill.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {
    @IsOptional()
    @IsString()
    designation:string
}
