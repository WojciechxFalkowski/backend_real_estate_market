import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Setting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    key: string;

    @Column({ type: 'json' }) 
    value: any;

    @ManyToOne((type) => User, (entity) => entity.id, { nullable: false })
    @JoinColumn()
    user: User;

    @Column()
    userId: number; //foreign key

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