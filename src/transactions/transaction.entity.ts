/* eslint-disable @typescript-eslint/no-unused-vars */
import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((_type) => User, (user) => user.wallets, { eager: false })
  @Exclude({ toPlainOnly: true })
  sender: User;

  @ManyToOne((_type) => User, (user) => user.wallets, { eager: false })
  @Exclude({ toPlainOnly: true })
  receiver: User;
}
