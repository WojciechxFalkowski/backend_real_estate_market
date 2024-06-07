import { Controller, Post, Get, Param, Body, Query, Delete } from '@nestjs/common';
import { AnalyticsEventsService } from './analytics-events.service';
import { AnalyticsEvent } from './entities/analytics-event.entity';
import { EventType } from './analytics-events.contracts';
import { Public } from 'src/auth/constants';

@Controller('analytics-events')
export class AnalyticsEventsController {
  constructor(private readonly analyticsEventsService: AnalyticsEventsService) { }

  @Post('event')
  @Public()
  public async createEvent(
    @Body('visitorId') visitorId: string,
    @Body('type') type: EventType,
    @Body('data') data: any,
  ): Promise<AnalyticsEvent> {
    return this.analyticsEventsService.createEvent(visitorId, type, data);
  }

  @Get('events/visitor/:visitorId')
  public async findEventsByVisitor(@Param('visitorId') visitorId: string): Promise<AnalyticsEvent[]> {
    return this.analyticsEventsService.findEventsByVisitor(visitorId);
  }

  @Get('events')
  public async findAllEvents(): Promise<AnalyticsEvent[]> {
    return this.analyticsEventsService.findAllEvents();
  }

  @Get('page-views')
  public async getPageViews(
    @Query('groupBy') groupBy: 'day' | 'month',
    @Query('excludedVisitors') excludedVisitors: string,
    @Query('unique') unique: boolean
  ): Promise<{ date: string, count: number }[]> {
    return await this.analyticsEventsService.getPageViews(groupBy, excludedVisitors, unique);
  }

  @Get('excluded-visitors')
  public async getExcludedVisitors(): Promise<string[]> {
    return this.analyticsEventsService.getExcludedVisitors();
  }

  @Delete('exclude-visitor')
  public async removeExcludedVisitor(@Body('visitorId') visitorId: string): Promise<void> {
    await this.analyticsEventsService.removeExcludedVisitor(visitorId);
  }

  @Get('user-count-by-device')
  public async getUserCountByDevice(): Promise<{ deviceType: string, count: number }[]> {
    return await this.analyticsEventsService.getUserCountByDevice();
  }
}
