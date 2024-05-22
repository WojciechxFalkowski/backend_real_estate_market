import { Controller, Post, Req, Body, Get } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { Visitor } from './entities/visitor.entity';
import { Public } from 'src/auth/constants';
import { CreateVisitorDto } from './dto/create-visitor.dto';

@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) { }

  @Get()
  @Public()
  async test() {
    return this.visitorService.getIpAddress();
  }

  @Post()
  @Public()
  async createVisitor(
    @Body() body: CreateVisitorDto,
  ): Promise<Visitor> {
    const { deviceInfo, ipAddress } = body;
    return this.visitorService.createVisitor(deviceInfo, ipAddress);
  }
}
