import { IsString } from 'class-validator';

export class AddToNewsletterListDto {
    @IsString()
    email: string;
}
