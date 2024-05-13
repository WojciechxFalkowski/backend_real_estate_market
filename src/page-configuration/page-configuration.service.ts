import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePageConfigurationDto } from './dto/create-page-configuration.dto';
import { UpdatePageConfigurationDto } from './dto/update-page-configuration.dto';
import { PAGE_CONFIGURATION_REPOSITORY } from './page-configuration.contracts';
import { PageConfiguration } from './entities/page-configuration.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PageConfigurationService {
  constructor(
    @Inject(PAGE_CONFIGURATION_REPOSITORY)
    private pageConfigurationRepository: Repository<PageConfiguration>,
  ) { }

  public async create(createPageConfigurationDto: CreatePageConfigurationDto) {
    const newEntityPageConfiguration = await this.pageConfigurationRepository.create(createPageConfigurationDto)
    await this.pageConfigurationRepository.save(newEntityPageConfiguration);
    return newEntityPageConfiguration
  }

  public async findAll() {
    return await this.pageConfigurationRepository.find()
  }

  public async findOne(id: number) {
    return `This action returns a #${id} pageConfiguration`;
  }

  public async findOneByUrl(pageUrl: string) {
    return await this.pageConfigurationRepository.findOne({
      where: {
        pageUrl
      }
    })
  }

  public async update(pageUrl: string, updatePageConfigurationDto: UpdatePageConfigurationDto) {
    const entityToUpdate = await this.pageConfigurationRepository.findOne({ where: { pageUrl } })
    if (!entityToUpdate) {
      throw new NotFoundException(
        `Nie ma konfiguracji strony '${pageUrl}'`,
      );

    }

    // await this.pageConfigurationRepository.delete(entityToUpdate);
    await this.pageConfigurationRepository.update({ pageUrl }, updatePageConfigurationDto);

  }

  public async remove(id: number) {
    return `This action removes a #${id} pageConfiguration`;
  }
}
