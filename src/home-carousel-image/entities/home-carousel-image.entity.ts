import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class HomeCarouselImage {
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

    @Column({ default: 0 })
    order: number;
}
