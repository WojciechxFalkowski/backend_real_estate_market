import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreatePageConfigurationDto {
    @IsString()
    @IsOptional()
    title: string

    @IsOptional()
    @IsString()
    description: string
}
