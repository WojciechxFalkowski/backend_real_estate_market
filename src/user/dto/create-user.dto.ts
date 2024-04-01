import { UserPureData } from '../user.entity';
import { IsString, IsNotEmpty } from 'class-validator';

export class UserRegistrationDataDto implements UserPureData {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
