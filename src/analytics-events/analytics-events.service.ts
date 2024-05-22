import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ANALYTICS_EVENT_REPOSITORY, EventType } from './analytics-events.contracts';
import { Visitor } from 'src/visitor/entities/visitor.entity';
import { AnalyticsEvent } from './entities/analytics-event.entity';

@Injectable()
export class AnalyticsEventsService {
  constructor(
    @Inject(ANALYTICS_EVENT_REPOSITORY)
    private readonly eventRepository: Repository<AnalyticsEvent>,
    @Inject('VISITOR_REPOSITORY')
    private readonly visitorRepository: Repository<Visitor>,
  ) { }

  async createEvent(visitorId: string, type: EventType, data: any): Promise<AnalyticsEvent> {
    const visitor = await this.visitorRepository.findOne({ where: { id: visitorId } });
    if (!visitor) {
      throw new Error('Visitor not found');
    }

    const event = this.eventRepository.create({
      type,
      timestamp: new Date(),
      visitor,
      data,
    });

    return this.eventRepository.save(event);
  }

  async findEventsByVisitor(visitorId: string): Promise<AnalyticsEvent[]> {
    return this.eventRepository.find({ where: { visitor: { id: visitorId } } });
  }

  async findAllEvents(): Promise<AnalyticsEvent[]> {
    return this.eventRepository.find();
  }
}
