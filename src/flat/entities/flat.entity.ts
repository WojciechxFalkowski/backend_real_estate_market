import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

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

	// @Column({ nullable: true })
	// image: string;

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
}

@Entity()
export class FlatImage {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	publicId: string;

	@ManyToOne(() => Flat, flat => flat.images)
	flat: Flat;

	@Column({ default: 0 })
	order: number;

	@Column()
	flatId: number; //foreign key
}