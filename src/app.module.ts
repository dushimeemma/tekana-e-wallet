import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    RouterModule.register([
      {
        path: 'api',
        module: AuthModule,
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
