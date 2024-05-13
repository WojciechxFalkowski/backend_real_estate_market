import { Test, TestingModule } from '@nestjs/testing';
import { PageConfigurationService } from './page-configuration.service';

describe('PageConfigurationService', () => {
  let service: PageConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageConfigurationService],
    }).compile();

    service = module.get<PageConfigurationService>(PageConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
