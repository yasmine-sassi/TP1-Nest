import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 1 * 1024 * 1024;

    // ✅ Allow no file uploaded
    if (!value) {
      return value; // Skip validation if no file is provided
    }

    if (!allowedTypes.includes(value.mimetype)) {
      throw new BadRequestException(
          'File type not allowed. Only .jpg, .jpeg, and .png are accepted.'
      );
    }

    if (value.size > maxSize) {
      throw new BadRequestException('File size exceeds the 1MB limit.');
    }

    return value;
  }
}
