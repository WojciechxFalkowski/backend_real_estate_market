import { Module } from '@nestjs/common';
import { LeaseService } from './lease.service';
import { LeaseController } from './lease.controller';
import { DatabaseModule } from 'src/database/database.module';
import { leaseProvider } from './lease.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [LeaseController],
  providers: [...leaseProvider, LeaseService],
})
export class LeaseModule { }
