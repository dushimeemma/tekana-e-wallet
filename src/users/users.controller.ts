import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WalletResponseInterface } from '../wallets/interfaces/wallet.response.interface';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get('/')
  getUsers(): Promise<WalletResponseInterface> {
    return this.userService.getAllUsers();
  }
}
