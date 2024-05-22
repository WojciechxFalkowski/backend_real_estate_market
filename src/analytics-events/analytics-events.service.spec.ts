import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsEventsService } from './analytics-events.service';

describe('AnalyticsEventsService', () => {
  let service: AnalyticsEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalyticsEventsService],
    }).compile();

    service = module.get<AnalyticsEventsService>(AnalyticsEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
