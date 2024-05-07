import { DATA_SOURCE } from 'src/database/database.contracts';
import { DataSource } from 'typeorm';
import { NEWSLETTER_REPOSITORY } from './email.contracts';
import { Newsletter } from './entities/newsletter.entity';

export const emailProviders = [
  {
    provide: NEWSLETTER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Newsletter),
    inject: [DATA_SOURCE],
  }
];
