// src/team-members/team-members.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, BadRequestException } from '@nestjs/common';
import { TeamMembersService } from './team-members.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { Public } from 'src/auth/constants';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TeamMember } from './entities/team-member.entity';

@Controller('team-members')
export class TeamMembersController {
  constructor(private readonly teamMembersService: TeamMembersService) { }

  @Get()
  @Public()
  public async findAll() {
    return await this.teamMembersService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.teamMembersService.findOne(+id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  public async create(@UploadedFiles() images: Array<Express.Multer.File>, @Body() createTeamMemberDto: CreateTeamMemberDto): Promise<{
    message: string,
    teamMember: TeamMember
  }> {

    if (!images || images.length !== 1) {
      throw new BadRequestException('Niepoprawna ilość plików.');
    }
    const teamMember = await this.teamMembersService.create(createTeamMemberDto, images[0]);
    return { message: `Dodano nową osobę!`, teamMember };
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  public async update(@Param('id') id: string, @UploadedFiles() images: Array<Express.Multer.File>, @Body() updateTeamMemberDto: UpdateTeamMemberDto) {
    const image = images && images.length > 0 ? images[0] : null
    const teamMember = await this.teamMembersService.update(+id, updateTeamMemberDto, image);
    return { message: `Zaktualizowano dane!`, teamMember };

  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    await this.teamMembersService.remove(+id);

    return { message: `Usunięto osobę!` };
  }
}
