import { Module } from '@nestjs/common';
import { TeamMembersService } from './team-members.service';
import { TeamMembersController } from './team-members.controller';
import { teamMemberProvider } from './team-members.providers';
import { DatabaseModule } from 'src/database/database.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [DatabaseModule, CloudinaryModule],
  controllers: [TeamMembersController],
  providers: [...teamMemberProvider, TeamMembersService],
})
export class TeamMembersModule { }
