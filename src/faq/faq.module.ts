import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';
import { DatabaseModule } from 'src/database/database.module';
import { faqProvider } from './faq.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FaqController],
  providers: [...faqProvider, FaqService],
})
export class FaqModule { }
