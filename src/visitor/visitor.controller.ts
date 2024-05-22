import { Controller, Post, Req, Body, Get, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { Public } from 'src/auth/constants';
import { CreateVisitorDto, SetVisitorEmailDto } from './dto/create-visitor.dto';

@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) { }

  @Get('/:id')
  @Public()
  async checkVisitor(
    @Param('id') id: string,
  ): Promise<{ isAvailable: boolean }> {
    try {
      return {
        isAvailable: await this.visitorService.checkVisitor(id)
      }
    }
    catch (error) {
      console.log(error)
      return error
    }
  }

  @Post()
  @Public()
  async createVisitor(
    @Body() body: CreateVisitorDto,
  ): Promise<{ visitorId: string }> {
    const { deviceInfo, ipAddress } = body;
    try {
      return await this.visitorService.createVisitor(deviceInfo, ipAddress);
    }
    catch (error) {
      console.log(error)
      return error
    }
  }

  @Post('/:id')
  @Public()
  async setVisitorEmail(
    @Param('id') id: string,
    @Query('email') email: string,
  ): Promise<{ message: string }> {
    if (email) {
      try {
        await this.visitorService.setVisitorEmail(id, email);

        return { message: `Zapisano email` };
      }
      catch (error) {
        console.log(error)
        return error
      }
    }
    throw new HttpException('Invalid data!', HttpStatus.NOT_ACCEPTABLE);
  }
}
