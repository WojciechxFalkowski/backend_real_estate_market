import { Test, TestingModule } from '@nestjs/testing';
import { PageConfigurationController } from './page-configuration.controller';
import { PageConfigurationService } from './page-configuration.service';

describe('PageConfigurationController', () => {
  let controller: PageConfigurationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PageConfigurationController],
      providers: [PageConfigurationService],
    }).compile();

    controller = module.get<PageConfigurationController>(PageConfigurationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
