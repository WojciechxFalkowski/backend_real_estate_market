import { IsString } from 'class-validator';

export class CreateIPInfoDto {
    @IsString()
    ipAddress: string;

    @IsString()
    country: string;

    @IsString()
    countryCode: string;

    @IsString()
    region: string;

    @IsString()
    city: string;

    @IsString()
    latitude: string;

    @IsString()
    longitude: string;

    @IsString()
    isp: string;

    @IsString()
    org: string;
}
