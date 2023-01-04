import { Module } from '@nestjs/common';
import { UserRepository } from 'src/auth/user.repository';
import { WalletsModule } from 'src/wallets/wallets.module';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [AuthModule, WalletsModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
