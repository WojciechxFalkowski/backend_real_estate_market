import { IsString } from 'class-validator';

export class CreateDeviceInfoDto {
    @IsString()
    clientType: string;

    @IsString()
    clientName: string;

    @IsString()
    clientVersion: string;

    @IsString()
    osName: string;

    @IsString()
    osVersion: string;

    @IsString()
    deviceType: string;

    @IsString()
    deviceBrand: string;

    @IsString()
    deviceModel: string;
}
