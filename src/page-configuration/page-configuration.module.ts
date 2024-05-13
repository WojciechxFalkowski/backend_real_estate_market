import { Module } from '@nestjs/common';
import { PageConfigurationService } from './page-configuration.service';
import { PageConfigurationController } from './page-configuration.controller';
import { pageConfigurationProvider } from './page-configuration.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PageConfigurationController],
  providers: [...pageConfigurationProvider, PageConfigurationService],
})
export class PageConfigurationModule { }
