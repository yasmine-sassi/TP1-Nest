import { IsNotEmpty, IsString, isString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSkillDto {
    @IsNotEmpty()
    @IsString()
    designation:string;

}
