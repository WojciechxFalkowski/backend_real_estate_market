import { Module } from '@nestjs/common';
import { HomeCarouselImageService } from './home-carousel-image.service';
import { HomeCarouselImageController } from './home-carousel-image.controller';
import { DatabaseModule } from 'src/database/database.module';
import { homeCarouselImageProvider } from './home-carousel-image.providers';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [DatabaseModule, CloudinaryModule],
  controllers: [HomeCarouselImageController],
  providers: [...homeCarouselImageProvider, HomeCarouselImageService],

})
export class HomeCarouselImageModule { }
