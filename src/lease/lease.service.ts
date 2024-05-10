import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateLeaseItemDto } from './dto/create-lease.dto';
import { LEASE_REPOSITORY } from './lease.contracts';

@Injectable()
export class LeaseService {
  constructor(
    @Inject(LEASE_REPOSITORY)
    private leaseItemRepository: Repository<CreateLeaseItemDto>,
  ) { }

  public async findAll(): Promise<CreateLeaseItemDto[]> {
    return this.leaseItemRepository.find();
  }

  public async update(items: CreateLeaseItemDto[]): Promise<CreateLeaseItemDto[]> {
    await this.leaseItemRepository.delete({});
    return this.leaseItemRepository.save(items);
  }
}
