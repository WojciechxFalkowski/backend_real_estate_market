import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity()
export class Faq {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    type: string;

    @Column({ nullable: true, type: 'longtext', })
    title: string;

    @Column({ nullable: false, default: false })
    isActive: boolean;

    @Column({ nullable: false })
    orderId: number;

    @Column({ nullable: true, type: 'longtext', })
    description: string;

    @Column({ nullable: true, type: 'longtext', })
    listTitle: string;

    @Column({ type: 'json', nullable: true })
    list: string[];

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
