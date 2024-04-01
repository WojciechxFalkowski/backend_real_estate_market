import { DATA_SOURCE } from 'src/database/database.contracts';
import { DataSource } from 'typeorm';
import { Setting } from './entities/setting.entity';
import { SETTINGS_REPOSITORY } from './settings.contracts';

export const settingsProvider = [
  {
    provide: SETTINGS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Setting),
    inject: [DATA_SOURCE],
  },
];
