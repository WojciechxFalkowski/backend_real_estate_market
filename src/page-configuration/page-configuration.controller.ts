import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PageConfigurationService } from './page-configuration.service';
import { CreatePageConfigurationDto } from './dto/create-page-configuration.dto';
import { UpdatePageConfigurationDto } from './dto/update-page-configuration.dto';
import { Public } from 'src/auth/constants';

@Controller('page-configuration')
export class PageConfigurationController {
  constructor(private readonly pageConfigurationService: PageConfigurationService) { }

  @Post()
  public async create(@Body() createPageConfigurationDto: CreatePageConfigurationDto) {
    return await this.pageConfigurationService.create(createPageConfigurationDto); 
  }

  @Get()
  @Public()
  public async findAll() {
    return await this.pageConfigurationService.findAll();
  }

  @Get(':pageUrl')
  @Public()
  public async findOne(@Param('pageUrl') pageUrl: string) {
    return await this.pageConfigurationService.findOneByUrl(pageUrl);
  }

  @Patch(':pageUrl')
  public async update(@Param('pageUrl') pageUrl: string, @Body() updatePageConfigurationDto: UpdatePageConfigurationDto) {
    await this.pageConfigurationService.update(pageUrl, updatePageConfigurationDto);
    return { message: `Zaktualizowano konfiguracje strony!` };
  }
}
