import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { WalletsModule } from './wallets/wallets.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    WalletsModule,
    TransactionsModule,
    UsersModule,
    RouterModule.register([
      {
        path: 'api',
        module: AuthModule,
        children: [WalletsModule, TransactionsModule, UsersModule],
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
