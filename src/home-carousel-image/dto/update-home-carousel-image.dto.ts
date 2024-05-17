import { IsArray, IsNumber, IsString } from "class-validator";

export class UpdateHomeCarouselImageDto {
    @IsArray()
    images: HomeCarouselImagesOrderDto[];
}

export class HomeCarouselImagesOrderDto {
    @IsString()
    publicId: string;

    @IsNumber()
    orderId: number;
}