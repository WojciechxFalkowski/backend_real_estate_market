import { Controller, Get, Body, Put } from '@nestjs/common';
import { FaqService } from './faq.service';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { Public } from 'src/auth/constants';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) { }

  @Public()
  @Get('/activeFaq')
  public async findActiveFaqs() {
    return this.faqService.findActiveFaqs();
  }

  @Public()
  @Get()
  public async findAll() {
    return this.faqService.findAll();
  }

  @Put()
  public async replaceAll(@Body() updateFaqDtos: UpdateFaqDto[]) {
    await this.faqService.replaceAll(updateFaqDtos);
    return { message: 'FAQ został zaktualizowany!' };
  }
}
