import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { DataSource, Repository } from 'typeorm';
import { WalletDto } from './dto/wallet.dto';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletsRepository extends Repository<Wallet> {
  constructor(private dataSource: DataSource) {
    super(Wallet, dataSource.createEntityManager());
  }
  /**
   *  Check balance repository
   */
  async checkBalance(user: User): Promise<Wallet | any> {
    const query = await this.createQueryBuilder('wallet');
    query.where({ user });
    query.orderBy('created_at', 'DESC');
    let balance = await query.getOne();
    if (balance) {
      return balance;
    } else {
      /**
       *  Providing dummy balance for a user who didn't save
       *  Bad practice but i did it because of time
       *  It will be updated soon
       */
      balance = {
        id: user.id,
        balance: 0,
        amount: 0,
        created_at: user.created_at,
        updated_at: user.updated_at,
        user,
      };
      delete balance.user;
      return balance;
    }
  }
  /**
   *  Deposing amount into wallets repository
   */
  async createWallet(user: User, walletDto: WalletDto): Promise<Wallet> {
    const { amount } = walletDto;
    const query = await this.createQueryBuilder('wallet');
    query.where({ user });
    query.orderBy('created_at', 'DESC');
    const currentWallet = await this.checkBalance(user);
    const balance = currentWallet.balance + amount;
    const wallet = this.create({ amount, balance, user });
    try {
      await this.save(wallet);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return wallet;
  }
  /**
   *  Balance history repository
   */
  async balanceHistory(user: User): Promise<Wallet[]> {
    const query = await this.createQueryBuilder('wallet');
    query.where({ user });
    query.orderBy('created_at', 'DESC');
    return await query.getMany();
  }
}
