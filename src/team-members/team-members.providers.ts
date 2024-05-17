import { DATA_SOURCE } from 'src/database/database.contracts';
import { DataSource } from 'typeorm';
import { TeamMember } from './entities/team-member.entity';
import { TEAM_MEMBEERS_IMAGE_REPOSITORY, TEAM_MEMBEERS_REPOSITORY } from './team-members.contracts';
import { TeamMemberImage } from './entities/team-member-image.entity';

export const teamMemberProvider = [
  {
    provide: TEAM_MEMBEERS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TeamMember),
    inject: [DATA_SOURCE],
  },
  {
    provide: TEAM_MEMBEERS_IMAGE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TeamMemberImage),
    inject: [DATA_SOURCE],
  }
];
