import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class PageConfiguration {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    pageUrl: string

    @Column()
    title: string

    @Column()
    description: string

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
