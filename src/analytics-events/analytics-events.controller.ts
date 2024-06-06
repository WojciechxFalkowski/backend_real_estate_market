import { Controller, Post, Get, Param, Body, Query, Delete } from '@nestjs/common';
import { AnalyticsEventsService } from './analytics-events.service';
import { AnalyticsEvent } from './entities/analytics-event.entity';
import { EventType } from './analytics-events.contracts';
import { Public } from 'src/auth/constants';
import { Visitor } from 'src/visitor/entities/visitor.entity';

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

  // @Get('page-views')
  // async getPageViews(@Query('groupBy') groupBy: 'day' | 'month') {
  //   return this.analyticsEventsService.getPageViews(groupBy);
  // }
  // @Get('page-views')
  // async getPageViews(
  //   @Query('groupBy') groupBy: 'day' | 'month',
  //   @Query('excludedVisitors') excludedVisitors: string,
  // ) {
  //   const excludedVisitorsArray = excludedVisitors ? excludedVisitors.split(',') : [];
  //   return this.analyticsEventsService.getPageViews(groupBy, excludedVisitorsArray);
  // }
  @Get('page-views')
  async getPageViews(
    @Query('groupBy') groupBy: 'day' | 'month',
    @Query('excludedVisitors') excludedVisitors: string
  ): Promise<{ date: string, count: number }[]> {
    return this.analyticsEventsService.getPageViews(groupBy, excludedVisitors);
  }

  @Get('unique-page-views')
  async getUniquePageViews(
    @Query('groupBy') groupBy: 'day' | 'month',
    @Query('excludedVisitors') excludedVisitors: string[]
  ): Promise<{ date: string, count: number }[]> {
    return this.analyticsEventsService.getUniquePageViews(groupBy, excludedVisitors);
  }

  @Get('excluded-visitors')
  async getExcludedVisitors(): Promise<string[]> {
    return this.analyticsEventsService.getExcludedVisitors();
  }

  @Delete('exclude-visitor')
  async removeExcludedVisitor(@Body('visitorId') visitorId: string): Promise<void> {
    await this.analyticsEventsService.removeExcludedVisitor(visitorId);
  }
}
