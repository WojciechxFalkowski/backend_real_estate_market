import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Setting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    key: string;

    @Column({ type: 'json' }) 
    value: any;

    @ManyToOne((type) => User, (entity) => entity.id, { nullable: false })
    @JoinColumn()
    user: User;

    @Column()
    userId: number; //foreign key
} 