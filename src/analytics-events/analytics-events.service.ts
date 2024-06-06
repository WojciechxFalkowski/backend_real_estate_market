import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ANALYTICS_EVENT_REPOSITORY, EventType } from './analytics-events.contracts';
import { Visitor } from 'src/visitor/entities/visitor.entity';
import { AnalyticsEvent } from './entities/analytics-event.entity';
import { VISITOR_REPOSITORY } from 'src/visitor/visitor.contracts';

@Injectable()
export class AnalyticsEventsService {
  constructor(
    @Inject(ANALYTICS_EVENT_REPOSITORY)
    private readonly eventRepository: Repository<AnalyticsEvent>,
    @Inject(VISITOR_REPOSITORY)
    private readonly visitorRepository: Repository<Visitor>,
  ) { }

  public async createEvent(visitorId: string, type: EventType, data: any): Promise<AnalyticsEvent> {
    const visitor = await this.visitorRepository.findOne({ where: { id: visitorId } });
    if (!visitor) {
      throw new Error('Visitor not found');
    }

    const event = this.eventRepository.create({
      type,
      visitor,
      data,
    });

    return this.eventRepository.save(event);
  }

  public async findEventsByVisitor(visitorId: string): Promise<AnalyticsEvent[]> {
    return this.eventRepository.find({ where: { visitor: { id: visitorId } } });
  }

  public async findAllEvents(): Promise<AnalyticsEvent[]> {
    return this.eventRepository.find();
  }

  // public async getPageViews(groupBy: 'day' | 'month'): Promise<{ date: string, count: number }[]> {
  //   let formatString = '%Y-%m-%d'; // default to daily format
  //   if (groupBy === 'month') {
  //     formatString = '%Y-%m';
  //   }

  //   const query = `
  //       SELECT DATE_FORMAT(timestamp, ?) as date, COUNT(*) as count
  //       FROM analytics_event
  //       WHERE type = 'page_view'
  //       GROUP BY date
  //       ORDER BY date
  //   `;

  //   return this.eventRepository.query(query, [formatString]);
  // }
  // public async getPageViews(groupBy: 'day' | 'month', excludedVisitors: string[]): Promise<{ date: string, count: number }[]> {
  //   let formatString = '%Y-%m-%d'; // default to daily format
  //   if (groupBy === 'month') {
  //     formatString = '%Y-%m';
  //   }

  //   const excludedVisitorsQuery = excludedVisitors.length > 0 ? `AND visitorId NOT IN (${excludedVisitors.map(() => '?').join(', ')})` : '';

  //   const query = `
  //     SELECT DATE_FORMAT(timestamp, ?) as date, COUNT(*) as count
  //     FROM analytics_event
  //     WHERE type = 'page_view'
  //     ${excludedVisitorsQuery}
  //     GROUP BY date
  //     ORDER BY date
  //   `;

  //   return this.eventRepository.query(query, [formatString, ...excludedVisitors]);
  // }

  public async getPageViews(groupBy: 'day' | 'month', excludedVisitorsString: string): Promise<{ date: string, count: number }[]> {
    let formatString = '%Y-%m-%d';
    if (groupBy === 'month') {
      formatString = '%Y-%m';
    }
    const excludedVisitors = excludedVisitorsString.split(",")

    const excludedCondition = excludedVisitors.length ? `AND visitorId NOT IN (${excludedVisitors.map(id => `'${id}'`).join(',')})` : '';

    const query = `
        SELECT DATE_FORMAT(timestamp, ?) as date, COUNT(*) as count
        FROM analytics_event
        WHERE type = 'page_view' ${excludedCondition}
        GROUP BY date
        ORDER BY date
    `;

    return this.eventRepository.query(query, [formatString]);
  }

  public async getUniquePageViews(groupBy: 'day' | 'month', excludedVisitors: string[]): Promise<{ date: string, count: number }[]> {
    let formatString = '%Y-%m-%d';
    if (groupBy === 'month') {
      formatString = '%Y-%m';
    }

    const excludedCondition = excludedVisitors.length ? `AND visitorId NOT IN (${excludedVisitors.map(id => `'${id}'`).join(',')})` : '';

    const query = `
        SELECT DATE_FORMAT(timestamp, ?) as date, COUNT(DISTINCT visitorId) as count
        FROM analytics_event
        WHERE type = 'page_view' ${excludedCondition}
        GROUP BY date
        ORDER BY date
    `;

    return this.eventRepository.query(query, [formatString]);
  }

  public async getExcludedVisitors(): Promise<string[]> {
    const excludedVisitorsId = await this.visitorRepository.find({ where: { isExcluded: true } });
    return excludedVisitorsId.map(excludedVisitorId => excludedVisitorId.id)
  }

  public async removeExcludedVisitor(visitorId: string): Promise<void> {
    console.log('visitorId')
    console.log(visitorId)
    const visitor = await this.visitorRepository.findOne({ where: { id: visitorId } });
    if (!visitor) {
      throw new Error('Visitor not found');
    }
    visitor.isExcluded = !visitor.isExcluded;
    await this.visitorRepository.save(visitor);
  }
}
