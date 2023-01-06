import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { UserRepository } from '../auth/user.repository';
import { WalletResponseInterface } from '../wallets/interfaces/wallet.response.interface';
import { GetUserDto } from './dto/get-users-dto';
import { CompleteProfileDto } from './dto/profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly usersRepository: UserRepository,
  ) {}
  async getAllUsers(getUserDto: GetUserDto): Promise<WalletResponseInterface> {
    return {
      success: true,
      message: 'users retrieved successfully',
      data: await this.usersRepository.getAllUsers(getUserDto),
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
