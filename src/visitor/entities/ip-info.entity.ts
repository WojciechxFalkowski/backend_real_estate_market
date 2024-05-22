import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class IPInfo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    ipAddress: string;

    @Column()
    country: string;

    @Column()
    countryCode: string;

    @Column()
    region: string;

    @Column()
    city: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column()
    isp: string;

    @Column()
    org: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
