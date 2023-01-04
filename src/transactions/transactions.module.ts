import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { WalletsModule } from 'src/wallets/wallets.module';
import { WalletsRepository } from 'src/wallets/wallets.repository';
import { AuthModule } from '../auth/auth.module';
import { Transaction } from './transaction.entity';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [AuthModule, WalletsModule, TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionsRepository,
    WalletsRepository,
    UserRepository,
  ],
})
export class TransactionsModule {}
