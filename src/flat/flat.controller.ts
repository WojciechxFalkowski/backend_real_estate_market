import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UploadedFile, HttpException, HttpStatus, UseInterceptors, BadRequestException, UploadedFiles, Put } from '@nestjs/common';
import { FlatService } from './flat.service';
import { CreateFlatDto } from './dto/create-flat.dto';
import { UpdateFlatDto } from './dto/update-flat.dto';
import { Public } from 'src/auth/constants';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { DeleteFlatImageDto } from './dto/delete-flat-image.dto';
import { UpdateImagesOrderDto } from './dto/update-images-order';


@Controller('flat')
export class FlatController {

  constructor(
    private readonly flatService: FlatService) { }

  @Post()
  public async create(@Request() req, @Body() createFlatDto: CreateFlatDto, @UploadedFile() file: Express.Multer.File,) {
    await this.flatService.create(createFlatDto, req.user.userId, file);
    return { message: 'Mieszkanie zostało stworzone.' };
  }

  @Post(':id/images')
  @UseInterceptors(FilesInterceptor('files'))
  public async addImages(
    @Param('id') flatId: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Pliki muszą zostać dostarczone.');
    }
    const images = await this.flatService.addImages(flatId, files);
    const message = images.length > 1 ? `Zdjęcia zostały dodane!` : `Zdjęcie zostało dodane!`
    return { message, images };
  }

  @Put(':id/images/order')
  public async updateOrder(
    @Param('id') flatId: string,
    @Body() updateImagesOrderDto: UpdateImagesOrderDto,
  ) {
    await this.flatService.updateImagesOrder(+flatId, updateImagesOrderDto);
    return { message: `Zaktualizowano kolejność zdjęć!` };
  }

  @Delete(':id/images')
  public async deleteImage(
    @Param('id') flatId: string,
    @Body() deleteFlatImageDto: DeleteFlatImageDto,
  ) {
    await this.flatService.deleteImage(+flatId, deleteFlatImageDto.publicId);
    return { message: `Zdjęcię zostało usunięte!` };
  }

  @Public()
  @Get()
  public async findAll(@Request() req) {
    return this.flatService.findAll();
  }

  @Public()
  @Get(':url')
  findOne(@Param('url') url: string) {
    return this.flatService.findOneByUrl(url);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateFlatDto: UpdateFlatDto) {
    return this.flatService.update(+id, updateFlatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flatService.remove(+id);
  }
}
