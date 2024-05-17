import { Inject, Injectable } from '@nestjs/common';
import { UpdateHomeCarouselImageDto } from './dto/update-home-carousel-image.dto';
import { HOME_CAROUSEL_IMAGE_DIRECTORY_PATH, HOME_CAROUSEL_IMAGE_REPOSITORY, HomeCarouselResponse } from './home-carousel-image.contracts';
import { Repository } from 'typeorm';
import { HomeCarouselImage } from './entities/home-carousel-image.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class HomeCarouselImageService {
  constructor(@Inject(HOME_CAROUSEL_IMAGE_REPOSITORY)
  private homeCarouselImageRepository: Repository<HomeCarouselImage>, private readonly cloudinaryService: CloudinaryService) { }

  public async create(files: Array<Express.Multer.File>): Promise<HomeCarouselResponse[]> {
    const flatImages = await this.findAll();
    const maxOrderNumber = flatImages.length
    const homeCarouselImageEntities: HomeCarouselImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uploadResponse = await this.cloudinaryService.uploadImageToCloudinary(file, HOME_CAROUSEL_IMAGE_DIRECTORY_PATH);
      const publicId = uploadResponse.public_id

      const homeCarouselImage = new HomeCarouselImage();
      homeCarouselImage.publicId = publicId;
      homeCarouselImage.order = maxOrderNumber + i + 1;
      homeCarouselImage.url = uploadResponse.secure_url
      homeCarouselImageEntities.push(homeCarouselImage);
    }

    await this.homeCarouselImageRepository.save(homeCarouselImageEntities);

    return await this.findAll();
  }

  // public mapHomeCarouselImage(image: HomeCarouselImage): HomeCarouselResponse {
  //   return {
  //     id: image.id,
  //     order: image.order,
  //     publicId: image.publicId,
  //     url: image.url,
  //     createdAt: image.createdAt,
  //     updatedAt: image.updatedAt,
  //   }
  // }

  public async findAll() {
    return await this.homeCarouselImageRepository.find({
      order: {
        order: 'ASC'
      }
    })
  }

  public async findOne(id: number) {
    return `This action returns a #${id} homeCarouselImage`;
  }

  public async update(id: number, updateHomeCarouselImageDto: UpdateHomeCarouselImageDto) {
    return `This action updates a #${id} homeCarouselImage`;
  }

  public async deleteImage(publicId: string): Promise<void> {
    await this.cloudinaryService.deleteImage(publicId)
    await this.homeCarouselImageRepository.delete({ publicId })
  }

  public async remove(publicId: string) {
    await this.deleteImage(publicId)
  }

  public async updateImagesOrder(updateHomeCarouselImageDto: UpdateHomeCarouselImageDto) {
    const homeCarouselImages = await this.findAll()

    updateHomeCarouselImageDto.images.map(image => {
      const selectedImage = homeCarouselImages.find(flatImage => flatImage.publicId === image.publicId)
      selectedImage.order = image.orderId
    })
    await this.homeCarouselImageRepository.save(homeCarouselImages)

  }
}
