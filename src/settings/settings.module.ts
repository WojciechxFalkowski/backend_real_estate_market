import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { DatabaseModule } from 'src/database/database.module';
import { settingsProvider } from './settings.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SettingsController],
  exports: [SettingsService],
  providers: [...settingsProvider, SettingsService],
})
export class SettingsModule { }
