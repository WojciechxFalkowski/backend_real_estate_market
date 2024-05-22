import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { VisitorController } from './visitor.controller';
import { VisitorProviders } from './visitor.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VisitorController],
  providers: [...VisitorProviders, VisitorService],
  exports: [VisitorService, ...VisitorProviders],
})
export class VisitorModule { }
