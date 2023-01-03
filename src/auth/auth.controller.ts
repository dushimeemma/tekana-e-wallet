import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LoginResponseInterface } from './interfaces/login.response.interface';
import { SignupResponseInterface } from './interfaces/signup.response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  signup(@Body() authDto: AuthDto): Promise<SignupResponseInterface> {
    return this.authService.signup(authDto);
  }
  @Post('/login')
  login(@Body() authDto: AuthDto): Promise<LoginResponseInterface> {
    return this.authService.login(authDto);
  }
}
