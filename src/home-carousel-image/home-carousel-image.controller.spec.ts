import { Test, TestingModule } from '@nestjs/testing';
import { HomeCarouselImageController } from './home-carousel-image.controller';
import { HomeCarouselImageService } from './home-carousel-image.service';

describe('HomeCarouselImageController', () => {
  let controller: HomeCarouselImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeCarouselImageController],
      providers: [HomeCarouselImageService],
    }).compile();

    controller = module.get<HomeCarouselImageController>(HomeCarouselImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
