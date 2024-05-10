import { PartialType } from '@nestjs/swagger';
import { CreateLeaseItemDto } from './create-lease.dto';

export class UpdateLeaseItemDto extends PartialType(CreateLeaseItemDto) { }
