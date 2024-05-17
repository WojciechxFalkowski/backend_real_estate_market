import { Test, TestingModule } from '@nestjs/testing';
import { HomeCarouselImageService } from './home-carousel-image.service';

describe('HomeCarouselImageService', () => {
  let service: HomeCarouselImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeCarouselImageService],
    }).compile();

    service = module.get<HomeCarouselImageService>(HomeCarouselImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
