import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('/test')
  test(): string {
    return this.appService.test();
  }
}
