import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { WalletDto } from './dto/wallet.dto';
import { WalletType } from './enums/balance.enum';
import { WalletResponseInterface } from './interfaces/wallet.response.interface';
import { WalletsRepository } from './wallets.repository';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(WalletsRepository)
    private readonly walletsRepository: WalletsRepository,
  ) {}

  /**
   *  Deposing amount into wallets service
   */
  async save(
    user: User,
    walletDto: WalletDto,
  ): Promise<WalletResponseInterface> {
    return {
      success: true,
      message: 'amount saved successfully',
      data: await this.walletsRepository.createWallet(
        user,
        walletDto,
        WalletType.BALANCE,
        'loaded balance',
      ),
    };
  }
  /**
   *  Check balance service
   */
  async balance(user: User): Promise<WalletResponseInterface> {
    return {
      success: true,
      message: 'balance retrieved successfully',
      data: await this.walletsRepository.checkBalance(user),
    };
  }
  /**
   *  Balance history service
   */
  async history(user: User): Promise<WalletResponseInterface> {
    return {
      success: true,
      message: 'history retrieved successfully',
      data: await this.walletsRepository.balanceHistory(user),
    };
  }
}
