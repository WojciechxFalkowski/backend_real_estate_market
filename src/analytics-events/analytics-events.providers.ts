import { DATA_SOURCE } from 'src/database/database.contracts';
import { DataSource } from 'typeorm';
import { AnalyticsEvent } from './entities/analytics-event.entity';
import { ANALYTICS_EVENT_REPOSITORY } from './analytics-events.contracts';

export const analyticsEventsProviders = [
    {
        provide: ANALYTICS_EVENT_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AnalyticsEvent),
        inject: [DATA_SOURCE],
    },
];
