import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Newsletter {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false, unique: true })
	email: string;

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