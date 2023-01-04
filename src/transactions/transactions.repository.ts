import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from '../auth/user.entity';
import { DataSource, Repository } from 'typeorm';
import { SendMoneyDto } from './dto/send-money.dto';
import { Transaction } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletsRepository } from '../wallets/wallets.repository';
import { UserRepository } from '../auth/user.repository';
import { WalletType } from 'src/wallets/enums/balance.enum';
import { WithdrawMoneyDto } from './dto/withdraw-money.dto';

@Injectable()
export class TransactionsRepository extends Repository<Transaction> {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(WalletsRepository)
    private readonly walletsRepository: WalletsRepository,
    @InjectRepository(UserRepository)
    private readonly usersRepository: UserRepository,
  ) {
    super(Transaction, dataSource.createEntityManager());
  }
  async sendMoney(
    user: User,
    sendMoneyDto: SendMoneyDto,
  ): Promise<Transaction> {
    const { amount, receiver: id } = sendMoneyDto;
    /** checking if you are not trying to send money to yourself
     * throwing an error if it is the case
     */
    if (user.id === id) {
      throw new ForbiddenException('Self transaction is not allowed');
    }
    // getting sender wallet to check balance
    const senderWallet = await this.walletsRepository.checkBalance(user);
    if (amount > senderWallet.balance) {
      // throwing an error if the sender have insufficient balance
      throw new BadRequestException('Insufficient balance');
    }
    // checking if the receiver has account
    const receiver = await this.usersRepository.findOneBy({
      id,
    });
    if (!receiver) {
      // throwing an error if the receiver doesn't have account
      throw new BadRequestException('Reciver not found');
    }
    // updating sender wallet balance
    await this.walletsRepository.createWallet(
      user,
      {
        amount,
      },
      WalletType.SENT_TRANSACTION,
      'sent money',
    );
    // updating receiver wallet balance
    await this.walletsRepository.createWallet(
      receiver,
      {
        amount,
      },
      WalletType.RECEIVED_TRANSACTION,
      'received money',
    );
    // create transaction
    const transaction = await this.create({ amount, receiver, sender: user });
    await this.save(transaction);
    return transaction;
  }

  async withdrawMoney(
    user: User,
    withdrawMoney: WithdrawMoneyDto,
  ): Promise<Transaction> {
    const { amount } = withdrawMoney;
    const userWallet = await this.walletsRepository.checkBalance(user);
    if (amount > userWallet.balance) {
      // throwing an error if the sender have insufficient balance
      throw new BadRequestException('Insufficient balance');
    }
    // updating user wallet balance
    await this.walletsRepository.createWallet(
      user,
      {
        amount,
      },
      WalletType.SENT_TRANSACTION,
      'withdrawn money',
    );
    // saving transaction
    const transaction = await this.create({
      amount,
      receiver: user,
      sender: user,
    });
    await this.save(transaction);
    return transaction;
  }

  async transactionHistory(user: User): Promise<Transaction[]> {
    const query = await this.createQueryBuilder('transaction');
    // getting all transactions where the sender or the receiver is the current authenticated user
    query.where({ sender: user });
    query.orWhere({ receiver: user });
    query.orderBy('created_at', 'DESC');
    return await query.getMany();
  }
}
