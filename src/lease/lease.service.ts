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
    return this.leaseItemRepository.find({
      order: {
        orderId: 'ASC'
      }
    });
  }

  public async findAllActive(): Promise<CreateLeaseItemDto[]> {
    return this.leaseItemRepository.find({
      where: {
        isActive: true
      },
      order: {
        orderId: 'ASC'
      }
    });
  }

  public async update(leaseItems: CreateLeaseItemDto[]): Promise<CreateLeaseItemDto[]> {
    const leaseItemsToUpdate = leaseItems.map((leaseItem, index) => {
      return {
        ...leaseItem,
        orderId: index
      }
    })
    await this.leaseItemRepository.delete({});
    return this.leaseItemRepository.save(leaseItemsToUpdate);
  }
}
