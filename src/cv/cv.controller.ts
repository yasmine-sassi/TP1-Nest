import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CvEntity } from './entities/cv.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {FileUploadService} from "src/file-upload/file-upload.service";
import {ImageValidationPipe} from "src/file-upload/pipes/image_validation.pipe";


@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService,
              private readonly fileUploadService: FileUploadService,
  ) {}

  @Post()


  async create(
      @Body() createCvDto: CreateCvDto,
      @UploadedFile(ImageValidationPipe) file: Express.Multer.File
  ): Promise<CvEntity> {
    return await this.cvService.create(createCvDto, file);
  }


  @Get()
  async findAll()   :Promise<CvEntity[]> {
    return await this.cvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(+id, updateCvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvService.remove(+id);
  }

  }


