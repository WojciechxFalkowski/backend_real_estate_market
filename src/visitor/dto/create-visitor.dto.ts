import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { CreateDeviceInfoDto } from "./create-device-info.dto";

export class CreateVisitorDto {
    @ValidateNested()
    @Type(() => CreateDeviceInfoDto)
    deviceInfo: CreateDeviceInfoDto;

    @IsString()
    ipAddress: string;
}