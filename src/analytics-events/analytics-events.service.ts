import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ANALYTICS_EVENT_REPOSITORY, EventType } from './analytics-events.contracts';
import { Visitor } from 'src/visitor/entities/visitor.entity';
import { AnalyticsEvent } from './entities/analytics-event.entity';
import { DEVICE_INFO_REPOSITORY, VISITOR_REPOSITORY } from 'src/visitor/visitor.contracts';
import { DeviceInfo } from 'src/visitor/entities/device-info.entity';

@Injectable()
export class AnalyticsEventsService {
  constructor(
    @Inject(ANALYTICS_EVENT_REPOSITORY)
    private readonly eventRepository: Repository<AnalyticsEvent>,
    @Inject(VISITOR_REPOSITORY)
    private readonly visitorRepository: Repository<Visitor>,
    @Inject(DEVICE_INFO_REPOSITORY)
    private readonly deviceInfoRepository: Repository<DeviceInfo>,
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


  public async getPageViews(groupBy: 'day' | 'month', excludedVisitorsString: string, unique: boolean): Promise<{ date: string, count: number }[]> {
    let formatString = '%Y-%m-%d';
    if (groupBy === 'month') {
      formatString = '%Y-%m';
    }
    const excludedVisitors = excludedVisitorsString.split(",")

    const excludedCondition = excludedVisitors.length ? `AND visitorId NOT IN (${excludedVisitors.map(id => `'${id}'`).join(',')})` : '';

    let query = `
    SELECT DATE_FORMAT(timestamp, ?) as date, ${unique ? 'COUNT(DISTINCT visitorId)' : 'COUNT(*)'} as count
    FROM analytics_event
    WHERE type = 'page_view' ${excludedCondition}
    GROUP BY date
    ORDER BY date
`

    return await this.eventRepository.query(query, [formatString]);
  }

  public async getExcludedVisitors(): Promise<string[]> {
    const excludedVisitorsId = await this.visitorRepository.find({ where: { isExcluded: true } });
    return excludedVisitorsId.map(excludedVisitorId => excludedVisitorId.id)
  }

  public async removeExcludedVisitor(visitorId: string): Promise<void> {
    const visitor = await this.visitorRepository.findOne({ where: { id: visitorId } });
    if (!visitor) {
      throw new Error('Visitor not found');
    }
    visitor.isExcluded = !visitor.isExcluded;
    await this.visitorRepository.save(visitor);
  }

  public async getUserCountByDevice(): Promise<{ deviceType: string, count: number }[]> {
    const query = `
      SELECT deviceType, COUNT(*) as count
      FROM device_info
      GROUP BY deviceType
    `;
    return await this.deviceInfoRepository.query(query);
  }

  public async getUserCountByOS(): Promise<{ osName: string, count: number }[]> {
    const query = `
      SELECT osName, COUNT(*) as count
      FROM device_info
      GROUP BY osName
    `;
    return await this.deviceInfoRepository.query(query);
  }

  public async getUserCountByBrowser(): Promise<{ clientName: string, count: number }[]> {
    const query = `
      SELECT clientName, COUNT(*) as count
      FROM device_info
      GROUP BY clientName
    `;
    return await this.deviceInfoRepository.query(query);
  }
}
