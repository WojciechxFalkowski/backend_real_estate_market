import { Module } from '@nestjs/common';
import { AnalyticsEventsService } from './analytics-events.service';
import { AnalyticsEventsController } from './analytics-events.controller';
import { analyticsEventsProviders } from './analytics-events.providers';
import { DatabaseModule } from 'src/database/database.module';
import { VisitorModule } from 'src/visitor/visitor.module';

@Module({
  imports: [DatabaseModule, VisitorModule],
  providers: [AnalyticsEventsService, ...analyticsEventsProviders],
  controllers: [AnalyticsEventsController],
})
export class AnalyticsEventsModule { }
