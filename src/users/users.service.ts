import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { UserRepository } from '../auth/user.repository';
import { WalletResponseInterface } from '../wallets/interfaces/wallet.response.interface';
import { CompleteProfileDto } from './dto/profile.dto';

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
        name: true,
        email: true,
        country: true,
        phone: true,
        city: true,
        address: true,
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

  async completeUserProfile(
    user: User,
    completeProfileDto: CompleteProfileDto,
  ): Promise<WalletResponseInterface> {
    return {
      success: true,
      message: 'user profile updated successfully',
      data: await this.usersRepository.completeProfile(
        user,
        completeProfileDto,
      ),
    };
  }
}
