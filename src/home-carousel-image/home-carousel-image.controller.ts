import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, BadRequestException, Put } from '@nestjs/common';
import { HomeCarouselImageService } from './home-carousel-image.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/constants';
import { DeleteHomeCarouselImageDto } from './dto/delete-home-carousel-image.dto';
import { UpdateHomeCarouselImageDto } from './dto/update-home-carousel-image.dto';

@Controller('home-carousel-image')
export class HomeCarouselImageController {
  constructor(private readonly homeCarouselImageService: HomeCarouselImageService) { }

  @Get()
  @Public()
  public async findAll() {
    return await this.homeCarouselImageService.findAll();
  }

  // @Get(':id')
  // public async findOne(@Param('id') id: string) {
  //   return this.homeCarouselImageService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHomeCarouselImageDto: UpdateHomeCarouselImageDto) {
  //   return this.homeCarouselImageService.update(+id, updateHomeCarouselImageDto);
  // }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  public async addHomeCarouselImages(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Pliki muszą zostać dostarczone.');
    }
    const images = await this.homeCarouselImageService.create(files);
    const message = images.length > 1 ? `Zdjęcia zostały dodane!` : `Zdjęcie zostało dodane!`
    return { message, images };
  }

  @Delete()
  public async remove(@Body() deleteHomeCarouselImageDto: DeleteHomeCarouselImageDto) {
    await this.homeCarouselImageService.remove(deleteHomeCarouselImageDto.publicId);
    return {
      message: 'Usunięto zdjęcie!'
    }
  }

  @Put('/order')
  public async updateOrder(
    @Body() updateHomeCarouselImageDto: UpdateHomeCarouselImageDto,
  ) {
    await this.homeCarouselImageService.updateImagesOrder(updateHomeCarouselImageDto);
    return { message: `Zaktualizowano kolejność zdjęć!` };
  }
}
