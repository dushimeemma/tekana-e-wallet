import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { TransactionsService } from './transactions.service';
import { SendMoneyDto } from './dto/send-money.dto';
import { WalletResponseInterface } from '../wallets/interfaces/wallet.response.interface';
import { WithdrawMoneyDto } from './dto/withdraw-money.dto';

@Controller('transactions')
@UseGuards(AuthGuard())
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post('/send-money')
  sendMoney(
    @GetUser() user: User,
    @Body() sendMoneyDto: SendMoneyDto,
  ): Promise<WalletResponseInterface> {
    return this.transactionsService.sendMoney(user, sendMoneyDto);
  }

  @Post('/withdraw')
  withdrawMoney(
    @GetUser() user: User,
    @Body() withdrawMoneyDto: WithdrawMoneyDto,
  ): Promise<WalletResponseInterface> {
    return this.transactionsService.withdrawMoney(user, withdrawMoneyDto);
  }

  @Get('/')
  transactionHistory(@GetUser() user: User): Promise<WalletResponseInterface> {
    return this.transactionsService.transactionHistory(user);
  }
}
