import { DATA_SOURCE } from 'src/database/database.contracts';
import { DataSource } from 'typeorm';
import { HomeCarouselImage } from './entities/home-carousel-image.entity';
import { HOME_CAROUSEL_IMAGE_REPOSITORY } from './home-carousel-image.contracts';

export const homeCarouselImageProvider = [
  {
    provide: HOME_CAROUSEL_IMAGE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(HomeCarouselImage),
    inject: [DATA_SOURCE],
  }
];
