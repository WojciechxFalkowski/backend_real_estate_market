import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { LocalAuthGuard } from './local-auth.guard';
import { UserRegistrationDataDto } from 'src/user/dto/create-user.dto';
import { SafeUser } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('/test')
  async test(@Request() req) {
    //return some random
    return { message: 'test' }
    // return this.authService.login(req.user);
  }

  @Public()
  @Post('/register')
  async register(
    @Body() user: UserRegistrationDataDto,
  ): Promise<SafeUser | null> {
    return await this.authService.register(user);
  }

  @Public()
  @Post('/verify-token')
  async verifyToken(@Body('token') token: string): Promise<{ isValid: boolean }> {
    return { isValid: await this.authService.verifyToken(token) };
  }
}
