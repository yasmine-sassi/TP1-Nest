// src/cv/controllers/cv.controller.v2.ts
import {
    Controller,
    Post,
    Body,
    Request,
    UseGuards,
    Put,
    Param,
    Delete,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Controller({ path: 'cv', version: '2' })
export class CvControllerV2 {
    constructor(private readonly cvService: CvService) {}

    @Post()
    async create(@Body() dto: CreateCvDto, @Request() req) {
        return this.cvService.create({
            ...dto,
            userId: req.user.id,
        });
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateCvDto, @Request() req) {
        const cv = await this.cvService.findOne(id);
        if (!cv) throw new NotFoundException('CV introuvable.');
        if (cv.user.id !== req.user.id) throw new ForbiddenException("Vous n'êtes pas le propriétaire.");

        return this.cvService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        const cv = await this.cvService.findOne(id);
        if (!cv) throw new NotFoundException('CV introuvable.');
        if (cv.user.id !== req.user.id) throw new ForbiddenException("Vous n'êtes pas le propriétaire.");

        return this.cvService.remove(id);
    }
}
