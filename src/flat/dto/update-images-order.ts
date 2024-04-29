import { IsArray, IsNumber, IsString } from "class-validator";

export class UpdateImagesOrderDto {
    @IsNumber()
    flatId: number;

    @IsArray()
    elements: ImagesOrderDto[];
}

export class ImagesOrderDto {
    @IsString()
    publicId: string;

    @IsNumber()
    orderId: number;
}