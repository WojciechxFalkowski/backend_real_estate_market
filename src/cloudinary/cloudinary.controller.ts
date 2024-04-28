import {
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
// import { Public } from 'src/auth/constants';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  // @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadImageToCloudinary(file);
  }
  // @Public()
  @Get('details')
  fetchImageDetails(@Query('publicId') publicId: string) {
    return this.cloudinaryService.fetchImageFromCloudinary(publicId);
  }

  // @Public()
  @Delete('/:id')
  async deleteCollection(@Query('publicId') publicId: string) {
    return await this.cloudinaryService.deleteImage(publicId);
  }
}
