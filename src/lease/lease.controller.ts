import { Controller, Get, Put, Body } from '@nestjs/common';
import { LeaseService } from './lease.service';
import { CreateLeaseItemDto } from './dto/create-lease.dto';
import { Public } from 'src/auth/constants';

@Controller('lease')
export class LeaseController {
  constructor(private readonly leaseService: LeaseService) { }

  @Get()
  public async findAll() {
    return await this.leaseService.findAll();
  }

  @Public()
  @Get('/activeLease')
  public async findAllActive() {
    return await this.leaseService.findAllActive();
  }

  @Put()
  public async update(@Body() updateItemsDto: CreateLeaseItemDto[]) {
    await this.leaseService.update(updateItemsDto);
    return { message: `Zaktualizowano dane!` };

  }
}
