import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRegistrationDataDto } from 'src/user/dto/create-user.dto';
import { SafeUser } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, inputPassword: string): Promise<any> {
    try {
      const user = await this.userService.findUserWithPasswordByEmail(email);

      const isPasswordMatching = await this.userService.validateUserPassword(
        inputPassword,
        user.password,
      );

      if (user && isPasswordMatching) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
    catch (error) {
      throw new Error(error.message);
    }
  }

  async login(user: any) {
    const payload = { userEmail: user.email, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async register(user: UserRegistrationDataDto): Promise<SafeUser | null> {
    // try {
    return await this.userService.register(user);
  }
  catch(error) {
    return error;
  }

  public async verifyToken(token: string): Promise<boolean> {
    try {
      this.jwtService.verify(token);
      return true;  // Jeśli token jest ważny
    } catch (error) {
      return false; // Jeśli token jest nieważny
    }
  }
}
