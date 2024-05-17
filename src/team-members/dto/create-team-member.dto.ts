import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTeamMemberDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    teamName: string;

    @IsString()
    @IsNotEmpty()
    specialization: string;

    @IsString()
    @IsNotEmpty()
    biography: string;
}