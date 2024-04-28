import { DATA_SOURCE } from 'src/database/database.contracts';
import { DataSource } from 'typeorm';
import { Flat, FlatImage } from './entities/flat.entity';
import { FLAT_REPOSITORY, FLAT_IMAGE_REPOSITORY } from './flat.contracts';

export const flatProvider = [
  {
    provide: FLAT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Flat),
    inject: [DATA_SOURCE],
  },
  {
    provide: FLAT_IMAGE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(FlatImage),
    inject: [DATA_SOURCE],
  },
];
