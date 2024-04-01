import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, HttpException, HttpStatus, } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * It is fully completed using documencation. Steps to check if necessery
 * https://docs.nestjs.com/recipes/passport#request-scoped-strategies -> **Request-scoped strategies**
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.authService.validateUser(email, password);
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    }
    catch (error) {
      throw new HttpException('Invalid credentials', HttpStatus.CONFLICT);
    }
  }
}