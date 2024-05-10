import { DATA_SOURCE } from 'src/database/database.contracts';
import { DataSource } from 'typeorm';
import { Lease } from './entities/lease.entity';
import { LEASE_REPOSITORY } from './lease.contracts';

export const leaseProvider = [
  {
    provide: LEASE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Lease),
    inject: [DATA_SOURCE],
  }
];
