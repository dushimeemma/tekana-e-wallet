import { IsNumber } from 'class-validator';

export class WithdrawMoneyDto {
  @IsNumber()
  amount: number;
}
