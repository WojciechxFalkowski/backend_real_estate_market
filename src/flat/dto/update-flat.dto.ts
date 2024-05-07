import { PartialType } from '@nestjs/swagger';
import { CreateFlatDto } from './create-flat.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateFlatDto extends PartialType(CreateFlatDto) {
    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}
