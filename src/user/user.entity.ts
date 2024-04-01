// import { Collection } from 'src/collection/entities/collection.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User implements UserPureData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  isActive: boolean;

  // @OneToMany((type) => Collection, (entity) => entity.id)
  // @JoinColumn()
  // cartItem: Collection[];

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  updatedAt: Date;
}

export interface UserPureData {
  email: string;
}

export class SafeUser implements UserPureData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: false })
  isActive: boolean;

  // @OneToMany((type) => Collection, (entity) => entity.id)
  // @JoinColumn()
  // cartItem: Collection[];

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
