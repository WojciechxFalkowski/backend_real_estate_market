import { IsOptional, IsString } from 'class-validator';

export class CreateDeviceInfoDto {
    @IsString()
    @IsOptional()
    clientType: string;

    @IsString()
    @IsOptional()
    clientName: string;

    @IsString()
    @IsOptional()
    clientVersion: string;

    @IsString()
    @IsOptional()
    osName: string;

    @IsString()
    @IsOptional()
    osVersion: string;

    @IsString()
    @IsOptional()
    deviceType: string;

    @IsString()
    @IsOptional()
    deviceBrand: string;

    @IsString()
    @IsOptional()
    deviceModel: string;
}
