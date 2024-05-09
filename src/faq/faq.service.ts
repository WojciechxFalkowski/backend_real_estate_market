import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Faq } from './entities/faq.entity';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { FAQ_REPOSITORY } from './contracts';

@Injectable()
export class FaqService {
  constructor(@Inject(FAQ_REPOSITORY) private faqRepository: Repository<Faq>) { }
  async replaceAll(updateFaqDtos: UpdateFaqDto[]) {
    await this.faqRepository.clear();
    const newFaqs = await this.faqRepository.create(updateFaqDtos);
    await this.faqRepository.save(newFaqs);
  }

  findAll() {
    return this.faqRepository.find({
      order: {
        orderId: 'ASC'
      }
    });
  }

  findActiveFaqs() {
    return this.faqRepository.find({
      where: {
        isActive: true
      },
      order: {
        orderId: 'ASC'
      }
    });
  }
}
