import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { TeamMember } from './team-member.entity';

@Entity()
export class TeamMemberImage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    publicId: string;

    @Column()
    url: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false,
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        nullable: false,
    })
    updatedAt: Date;

    @OneToOne(() => TeamMember, teamMember => teamMember.image)
    @JoinColumn()
    teamMember: TeamMember;

    // @Column()
    // teamMemberId: number; //foreign key
}
