import { IsString } from "class-validator";

export class DeleteHomeCarouselImageDto {
    @IsString()
    publicId: string;
}