import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TeamMember } from './entities/team-member.entity';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { TEAM_MEMBEERS_IMAGE_REPOSITORY, TEAM_MEMBEERS_REPOSITORY, TEAM_MEMBERS_DIRECTORY_PATH } from './team-members.contracts';
import { TeamMemberImage } from './entities/team-member-image.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class TeamMembersService {
  constructor(
    @Inject(TEAM_MEMBEERS_REPOSITORY)
    private teamMembersRepository: Repository<TeamMember>,
    @Inject(TEAM_MEMBEERS_IMAGE_REPOSITORY)
    private teamMembersImageRepository: Repository<TeamMemberImage>,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  public async create(createTeamMemberDto: CreateTeamMemberDto, image: Express.Multer.File): Promise<TeamMember> {

    const teamMember = await this.teamMembersRepository.create(createTeamMemberDto);
    const teamMemberEntity = await this.teamMembersRepository.save(teamMember)
    await this.addTeamMemberImage(teamMemberEntity, image)


    return await this.findOne(teamMember.id)
  }

  public async addTeamMemberImage(teamMemberEntity: TeamMember, image: Express.Multer.File) {
    const uploadResponse = await this.cloudinaryService.uploadImageToCloudinary(image, TEAM_MEMBERS_DIRECTORY_PATH);

    const teamMemberImageEntity = await this.teamMembersImageRepository.create({
      publicId: uploadResponse.public_id,
      url: uploadResponse.secure_url,
      teamMember: teamMemberEntity
    })

    await this.teamMembersImageRepository.save(teamMemberImageEntity)
  }

  public getTeamMemberRelations() {
    return {
      image: true
    }
  }

  public async findAll() {
    return await this.teamMembersRepository.find({
      relations: this.getTeamMemberRelations()
    });
  }

  public async findOne(id: number): Promise<TeamMember> {
    return this.teamMembersRepository.findOne({
      where: { id }, relations: this.getTeamMemberRelations()
    });
  }

  public async update(id: number, updateTeamMemberDto: UpdateTeamMemberDto, image: Express.Multer.File | null): Promise<TeamMember> {
    await this.teamMembersRepository.update(id, updateTeamMemberDto);
    const teamMemberEntity = await this.findOne(id);

    if (image) {
      await this.deleteTeamMemberImage(teamMemberEntity.image.publicId)
      await this.addTeamMemberImage(teamMemberEntity, image)
    }

    return await this.findOne(id)
  }

  public async deleteTeamMemberImage(publicId: string): Promise<void> {
    await this.cloudinaryService.deleteImage(publicId)
    await this.teamMembersImageRepository.delete({ publicId })
  }

  public async remove(id: number): Promise<void> {
    const teamMemberEntity = await this.findOne(id)
    await this.deleteTeamMemberImage(teamMemberEntity.image.publicId)
    await this.teamMembersRepository.delete(id);
    return
  }
}
