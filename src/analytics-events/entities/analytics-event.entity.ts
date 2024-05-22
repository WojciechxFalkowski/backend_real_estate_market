import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Visitor } from 'src/visitor/entities/visitor.entity';
import { EventType } from '../analytics-events.contracts';

@Entity()
export class AnalyticsEvent {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: EventType,
    })
    type: EventType;

    @CreateDateColumn()
    timestamp: Date;

    @ManyToOne(() => Visitor, visitor => visitor.analyticsEvents)
    visitor: Visitor;

    @Column('json')
    data: any;
}
