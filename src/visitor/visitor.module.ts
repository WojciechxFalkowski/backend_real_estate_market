import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { VisitorController } from './visitor.controller';
import { visitorProviders } from './visitor.providers';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [VisitorController],
  providers: [...visitorProviders, VisitorService],
  exports: [],
})
export class VisitorModule { }
