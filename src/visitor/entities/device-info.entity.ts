import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class DeviceInfo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    clientType: string;

    @Column()
    clientName: string;

    @Column()
    clientVersion: string;

    @Column()
    osName: string;

    @Column()
    osVersion: string;

    @Column()
    deviceType: string;

    @Column()
    deviceBrand: string;

    @Column()
    deviceModel: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
