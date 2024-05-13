import { IsNumber, IsString } from "class-validator"

export class CreatePageConfigurationDto {
    @IsString()
    title: string

    @IsString()
    description: string
}
