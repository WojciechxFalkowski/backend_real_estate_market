import { IsOptional, IsString } from "class-validator";

export class DeleteFlatImageDto {
    @IsString()
    @IsOptional()
    publicId: string;
}