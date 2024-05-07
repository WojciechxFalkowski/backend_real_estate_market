import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Flat } from './flat.entity';

@Entity()
export class FlatImage {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
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

	@ManyToOne(() => Flat, flat => flat.images)
	flat: Flat;

	@Column({ default: 0 })
	order: number;

	@Column()
	flatId: number; //foreign key
}