import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { WalletResponseInterface } from '../wallets/interfaces/wallet.response.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly usersRepository: UserRepository,
  ) {}
  async getAllUsers(): Promise<WalletResponseInterface> {
    const users = await this.usersRepository.find({
      select: {
        id: true,
        email: true,
      },
      order: {
        created_at: 'DESC',
      },
    });
    return {
      success: true,
      message: 'users retrieved successfully',
      data: users,
    };
  }
}
