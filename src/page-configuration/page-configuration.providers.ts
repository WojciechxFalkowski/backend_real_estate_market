import { DATA_SOURCE } from 'src/database/database.contracts';
import { DataSource } from 'typeorm';
import { PageConfiguration } from './entities/page-configuration.entity';
import { PAGE_CONFIGURATION_REPOSITORY } from './page-configuration.contracts';

export const pageConfigurationProvider = [
  {
    provide: PAGE_CONFIGURATION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PageConfiguration),
    inject: [DATA_SOURCE],
  }
];
