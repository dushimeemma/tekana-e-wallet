import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    WalletsModule,
    RouterModule.register([
      {
        path: 'api',
        module: AuthModule,
        children: [WalletsModule],
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
