import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Lease {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'longtext' })
    icon: string;

    @Column()
    classIcon: string;

    @Column({ default: 40 })
    desktopSize: number;

    @Column({ nullable: false })
    orderId: number;

    @Column({ nullable: false, default: false })
    isActive: boolean;

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
