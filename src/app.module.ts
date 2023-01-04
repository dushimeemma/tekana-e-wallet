import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { WalletsModule } from './wallets/wallets.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    WalletsModule,
    TransactionsModule,
    RouterModule.register([
      {
        path: 'api',
        module: AuthModule,
        children: [WalletsModule, TransactionsModule],
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
