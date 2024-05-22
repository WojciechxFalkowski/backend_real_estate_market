import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { DeviceInfo } from './device-info.entity';
import { IPInfo } from './ip-info.entity';
import { AnalyticsEvent } from 'src/analytics-events/entities/analytics-event.entity';

@Entity()
export class Visitor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    notes?: string;

    @Column({ nullable: true })
    phoneNumber?: string;

    @OneToOne(() => DeviceInfo, { cascade: true, eager: true })
    @JoinColumn()
    deviceInfo: DeviceInfo;

    @OneToOne(() => IPInfo, { cascade: true, eager: true })
    @JoinColumn()
    ipInfo: IPInfo;

    @OneToMany(() => AnalyticsEvent, analyticsEvent => analyticsEvent.visitor)
    analyticsEvents: AnalyticsEvent[];

    @CreateDateColumn()
    createdAt: Date;
}
