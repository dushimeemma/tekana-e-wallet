import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletResponseInterface } from 'src/wallets/interfaces/wallet.response.interface';
import { User } from '../auth/user.entity';
import { SendMoneyDto } from './dto/send-money.dto';
import { WithdrawMoneyDto } from './dto/withdraw-money.dto';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsRepository)
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async sendMoney(
    user: User,
    sendMoneyDto: SendMoneyDto,
  ): Promise<WalletResponseInterface> {
    return {
      success: true,
      message: 'money sent successfully',
      data: await this.transactionsRepository.sendMoney(user, sendMoneyDto),
    };
  }

  async withdrawMoney(
    user: User,
    withdrawMoneyDto: WithdrawMoneyDto,
  ): Promise<WalletResponseInterface> {
    return {
      success: true,
      message: 'money withdrawn successfully',
      data: await this.transactionsRepository.withdrawMoney(
        user,
        withdrawMoneyDto,
      ),
    };
  }

  async transactionHistory(user: User): Promise<WalletResponseInterface> {
    return {
      success: true,
      message: 'transactions retrieved successfully',
      data: await this.transactionsRepository.transactionHistory(user),
    };
  }
}
