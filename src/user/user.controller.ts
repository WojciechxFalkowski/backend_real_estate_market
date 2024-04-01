import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // import { JwtAuthGuard } from './auth/jwt-auth.guard';
  // @UseGuards(JwtAuthGuard) -> its not necessery because in auth.module.ts is register globally provider JwtAuthGuard
  @Get('me')
  public async getProfile(@Request() req) {
    try {
      const user = await this.userService.getSafeData(req.user.email);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
