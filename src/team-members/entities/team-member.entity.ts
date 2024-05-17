import { Entity, PrimaryGeneratedColumn, Column, OneToOne, UpdateDateColumn, JoinColumn } from 'typeorm';
import { TeamMemberImage } from './team-member-image.entity';

@Entity()
export class TeamMember {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    teamName: string;

    @Column()
    specialization: string;

    @Column({ type: 'longtext' })
    biography: string;

    @OneToOne(() => TeamMemberImage, teamMemberImage => teamMemberImage.teamMember)
    image: TeamMemberImage;

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
}
