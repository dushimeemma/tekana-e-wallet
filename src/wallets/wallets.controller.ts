import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { WalletDto } from './dto/wallet.dto';
import { WalletsService } from './wallets.service';
import { Wallet } from './wallet.entity';
import { WalletResponseInterface } from './interfaces/wallet.response.interface';

/**
 *  Protected wallets endpoints
 */
@Controller('wallets')
@UseGuards(AuthGuard())
export class WalletsController {
  constructor(private walletsService: WalletsService) {}

  /**
   *  Deposing amount into wallets endpoint
   */
  @Post('/save')
  save(
    @GetUser() user: User,
    @Body() walletDto: WalletDto,
  ): Promise<WalletResponseInterface> {
    return this.walletsService.save(user, walletDto);
  }

  /**
   *  Check balance endpoint
   */
  @Get('/balance')
  balance(@GetUser() user: User): Promise<WalletResponseInterface> {
    return this.walletsService.balance(user);
  }

  /**
   *  Balance history endpoint
   */
  @Get('/')
  history(@GetUser() user: User): Promise<WalletResponseInterface> {
    return this.walletsService.history(user);
  }
}
