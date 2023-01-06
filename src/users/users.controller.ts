import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { WalletResponseInterface } from '../wallets/interfaces/wallet.response.interface';
import { GetUserDto } from './dto/get-users-dto';
import { CompleteProfileDto } from './dto/profile.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get('/')
  getUsers(@Query() getUserDto: GetUserDto): Promise<WalletResponseInterface> {
    return this.userService.getAllUsers(getUserDto);
  }

  @Patch('/profile')
  completeUsersProfile(
    @GetUser() user: User,
    @Body() completeProfileDto: CompleteProfileDto,
  ): Promise<WalletResponseInterface> {
    return this.userService.completeUserProfile(user, completeProfileDto);
  }
}
