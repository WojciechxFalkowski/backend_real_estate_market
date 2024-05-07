import { IsString, IsOptional } from 'class-validator';
import { OneToMany } from 'typeorm';
import { FlatImage } from './../entities/flat-image.entity';

export class CreateFlatDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    url: string;

    @IsString()
    @IsOptional()
    location: string;

    @IsString()
    @IsOptional()
    area: string;

    @IsString()
    @IsOptional()
    floor: string;

    @IsString()
    @IsOptional()
    bedroom: string;

    @IsString()
    @IsOptional()
    rooms: string;

    @IsString()
    @IsOptional()
    year_of_construction: string;

    @IsString()
    @IsOptional()
    transaction_type: string;

    @IsString()
    @IsOptional()
    price: string;

    @IsString()
    @IsOptional()
    currency: string;

    @IsString()
    @IsOptional()
    pricePerMeter: string;

    @IsString()
    @IsOptional() // nullable: true, jeśli obraz nie jest wymagany
    image: string;

    @OneToMany(() => FlatImage, image => image.flat)
    images: FlatImage[];

    @IsString()
    @IsOptional()
    tiptapHTML: string;

    @IsOptional()
    file

    photoFileName: string
}
