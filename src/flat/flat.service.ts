import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateFlatDto } from './dto/create-flat.dto';
import { UpdateFlatDto } from './dto/update-flat.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FLAT_REPOSITORY, FlatDetailResponse, FlatResponse, FLAT_IMAGE_REPOSITORY, FlatImageResponse } from './flat.contracts';
import { Repository } from 'typeorm';
import { Flat, FlatImage } from './entities/flat.entity';
import { UserService } from 'src/user/user.service';
@Injectable()
export class FlatService {
  constructor(@Inject(FLAT_REPOSITORY)
  private flatRepository: Repository<Flat>, @Inject(FLAT_IMAGE_REPOSITORY) private flatImagesRepository: Repository<FlatImage>, private userService: UserService, private readonly cloudinaryService: CloudinaryService) {

  }
  public async create(createFlatDto: CreateFlatDto, userId: number, file: Express.Multer.File | null,) {
    try {
      // let cloudinaryImage = null;
      // if (file) {
      //   cloudinaryImage = await this.cloudinaryService.uploadImage(file);
      //   createFlatDto.photoFileName = cloudinaryImage.public_id;
      // }

      const newFlat = this.flatRepository.create(createFlatDto);
      const user = await this.userService.findOneById(userId);
      newFlat.user = user
      newFlat.tiptapHTML = ''
      await this.flatRepository.save(newFlat);
      return newFlat;
    }
    catch (error) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new ConflictException("Podane 'url' już istnieje w bazie danych.");
      }
      throw error;
    }
  }

  public async findAll(): Promise<FlatResponse[]> {
    const flats = await this.flatRepository.find({
      relations: {
        images: true
      }
    })
    return await Promise.all(flats.map(flat => this.mapFlat(flat)))
  }

  public async findOne(flatId: number): Promise<Flat> {
    const flat = await this.flatRepository.findOne({
      where: {
        id: flatId
      },
      relations: {
        images: true
      }
    })

    return flat
  }

  public async findOneByUrl(url: string): Promise<FlatResponse> {
    const flat = await this.flatRepository.findOne({
      where: {
        url: url
      },
      relations: {
        images: true
      }
    })

    return await this.mapFlat(flat)
  }

  public async update(id: number, updateFlatDto: UpdateFlatDto) {
    await this.flatRepository.update(id, updateFlatDto);

    const updatedFlat = await this.findOne(id)
    return updatedFlat
  }

  remove(id: number) {
    return `This action removes a #${id} flat`;
  }

  public async mapFlat(flat: Flat): Promise<FlatResponse> {
    return {
      id: flat.id,
      url: flat.url,
      title: flat.title,
      description: flat.description,
      // image: flat.image,
      flatDetails: [
        {
          id: 'area',
          title: "Powierzchnia",
          description: flat.area,
        },
        {
          id: 'floor',
          title: "Piętro",
          description: flat.floor,
        },
        {
          id: 'bedroom',
          title: "Sypialnie",
          description: flat.bedroom,
        },
        {
          id: 'rooms',
          title: "Pokoje",
          description: flat.rooms,
        },
        {
          id: 'year_of_construction',
          title: "Rok budowy",
          description: flat.year_of_construction,
        },
        {
          id: 'transaction_type',
          title: "Apartament",
          description: flat.transaction_type,
        },
      ],
      location: flat.location,
      // images: flat.images ? flat.images.map(img => img.publicId) : null,
      images: await this.fetchImagesFromCloudinary(flat.images),
      price: flat.price,
      currency: flat.currency,
      pricePerMeter: flat.pricePerMeter,
      tiptapHTML: flat.tiptapHTML
    };
  }

  public async fetchImagesFromCloudinary(images: FlatImage[]): Promise<FlatImageResponse[]> {
    const cloudinaryImagePromises = images.map(image => {
      return this.cloudinaryService.fetchImageFromCloudinary(image.publicId);
    });

    // Rozwiązujemy wszystkie obietnice równocześnie, a następnie wyciągamy URL-e obrazów
    const cloudinaryImages = await Promise.all(cloudinaryImagePromises);

    // Przyjmujemy, że fetchImageFromCloudinary zwraca obiekt z właściwością 'url'
    const mappedImages: FlatImageResponse[] = cloudinaryImages.map(image => {
      return {
        url: image.url as string,
        imageId: image.public_id as string
      }
    });
    return mappedImages;
  }

  public async addImages(flatId: string, files: Array<Express.Multer.File>): Promise<FlatImageResponse[]> {
    const flat = await this.findOne(+flatId)

    if (!flat) {
      throw new NotFoundException('Mieszkanie nie zostało znalezione.');
    }

    const imageEntities: FlatImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uploadResponse = await this.cloudinaryService.uploadImageToCloudinary(file);
      const publicId = uploadResponse.public_id
      console.log('uploadResponse')
      console.log(uploadResponse)

      const flatImage = new FlatImage();
      flatImage.publicId = publicId;
      flatImage.flat = flat;
      flatImage.order = flat.images.length + 1;
      imageEntities.push(flatImage);
    }

    await this.flatImagesRepository.save(imageEntities);

    const images = await this.fetchImagesFromCloudinary(imageEntities)
    return images;
  }

  public async deleteImage(flatId: number, publicId: string): Promise<void> {
    await this.cloudinaryService.deleteImage(publicId)
    await this.flatImagesRepository.delete({ flatId, publicId })
  }
}
