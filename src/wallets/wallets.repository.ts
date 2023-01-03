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
  async checkBalance(user: User): Promise<Wallet> {
    const query = await this.createQueryBuilder('wallet');
    query.where({ user });
    query.orderBy('created_at', 'DESC');
    const balance = await query.getOne();
    return balance;
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
