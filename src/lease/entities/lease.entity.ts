import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
