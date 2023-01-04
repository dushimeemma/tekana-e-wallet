/* eslint-disable @typescript-eslint/no-unused-vars */
import { Transaction } from '../transactions/transaction.entity';
import { Wallet } from '../wallets/wallet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany((_type) => Wallet, (wallet) => wallet.user, { eager: true })
  wallets: Wallet[];

  @OneToMany(
    (_type) => Transaction,
    (transction) => transction.receiver || transction.sender,
    { eager: true },
  )
  transactions: Transaction[];
}
