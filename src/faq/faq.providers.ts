import { DATA_SOURCE } from 'src/database/database.contracts';
import { DataSource } from 'typeorm';
import { FAQ_REPOSITORY } from './contracts';
import { Faq } from './entities/faq.entity';

export const faqProvider = [
  {
    provide: FAQ_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Faq),
    inject: [DATA_SOURCE],
  },
];
