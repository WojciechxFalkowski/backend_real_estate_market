import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AnalyticsEventsService } from './analytics-events.service';
import { AnalyticsEvent } from './entities/analytics-event.entity';
import { EventType } from './analytics-events.contracts';
import { Public } from 'src/auth/constants';

@Controller('analytics-events')
export class AnalyticsEventsController {
  constructor(private readonly analyticsEventsService: AnalyticsEventsService) { }

  @Post('event')
  @Public()
  async createEvent(
    @Body('visitorId') visitorId: string,
    @Body('type') type: EventType,
    @Body('data') data: any,
  ): Promise<AnalyticsEvent> {
    return this.analyticsEventsService.createEvent(visitorId, type, data);
  }

  @Get('events/visitor/:visitorId')
  async findEventsByVisitor(@Param('visitorId') visitorId: string): Promise<AnalyticsEvent[]> {
    return this.analyticsEventsService.findEventsByVisitor(visitorId);
  }

  @Get('events')
  async findAllEvents(): Promise<AnalyticsEvent[]> {
    return this.analyticsEventsService.findAllEvents();
  }
}
