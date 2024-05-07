import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FlatImage } from './flat-image.entity';

@Entity()
export class Flat {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	title: string;

	@Column({ nullable: true })
	description: string;

	@Column({ nullable: true, unique: true })
	url: string;

	@Column({ nullable: true })
	location: string;

	@Column({ nullable: true })
	area: string;

	@Column({ nullable: true })
	floor: string;

	@Column({ nullable: true })
	bedroom: string;

	@Column({ nullable: true })
	rooms: string;

	@Column({ nullable: true })
	year_of_construction: string;

	@Column({ nullable: true })
	transaction_type: string;

	@Column({ nullable: true })
	price: string;

	@Column({ nullable: true })
	currency: string;

	@Column({ nullable: true })
	pricePerMeter: string;

	@Column({ nullable: false, default: false })
	isActive: boolean;

	@OneToMany(() => FlatImage, image => image.flat)
	images: FlatImage[];

	@Column({
		type: 'longtext',
	})
	tiptapHTML: string;

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