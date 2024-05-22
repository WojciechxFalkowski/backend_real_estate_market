import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsEventsController } from './analytics-events.controller';
import { AnalyticsEventsService } from './analytics-events.service';

describe('AnalyticsEventsController', () => {
  let controller: AnalyticsEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyticsEventsController],
      providers: [AnalyticsEventsService],
    }).compile();

    controller = module.get<AnalyticsEventsController>(AnalyticsEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
