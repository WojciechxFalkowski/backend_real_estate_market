import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { DeviceInfo } from './device-info.entity';
import { IPInfo } from './ip-info.entity';

@Entity()
export class Visitor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    phoneNumber?: string;

    @OneToOne(() => DeviceInfo, { cascade: true, eager: true })
    @JoinColumn()
    deviceInfo: DeviceInfo;

    @OneToOne(() => IPInfo, { cascade: true, eager: true })
    @JoinColumn()
    ipInfo: IPInfo;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
