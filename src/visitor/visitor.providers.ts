import { DATA_SOURCE } from 'src/database/database.contracts';
import { DataSource } from 'typeorm';
import { Visitor } from './entities/visitor.entity';
import { VISITOR_REPOSITORY, IP_INFO_REPOSITORY, DEVICE_INFO_REPOSITORY } from './visitor.contracts';
import { IPInfo } from './entities/ip-info.entity';
import { DeviceInfo } from './entities/device-info.entity';

export const visitorProviders = [
  {
    provide: VISITOR_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Visitor),
    inject: [DATA_SOURCE],
  },
  {
    provide: IP_INFO_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(IPInfo),
    inject: [DATA_SOURCE],
  },
  {
    provide: DEVICE_INFO_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(DeviceInfo),
    inject: [DATA_SOURCE],
  }
];
