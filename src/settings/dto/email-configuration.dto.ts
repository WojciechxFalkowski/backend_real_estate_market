import { IsString } from 'class-validator';

export class EmailConfigurationDto {
  @IsString()
  email: string

  @IsString()
  password: string

  @IsString()
  serviceType: string
}
