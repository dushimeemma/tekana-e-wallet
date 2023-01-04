import { IsNumber, IsString } from 'class-validator';

export class SendMoneyDto {
  @IsNumber()
  amount: number;

  @IsString()
  receiver: string;
}
