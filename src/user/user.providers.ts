import { DATA_SOURCE } from 'src/database/database.contracts';
import { USER_REPOSITORY } from './user.contracts';
import { DataSource } from 'typeorm';
import { User } from './user.entity';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  }
];
