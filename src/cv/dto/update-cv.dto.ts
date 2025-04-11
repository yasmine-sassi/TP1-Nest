import { IsOptional, IsString, IsNumber, IsArray } from 'class-validator';

export class UpdateCvDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    firstname: string;

    @IsOptional()
    @IsNumber()
    age: number;

    @IsOptional()
    @IsString()
    cin: string;

    @IsOptional()
    @IsString()
    job: string;

    @IsOptional()
    @IsString()
    path: string;

}
