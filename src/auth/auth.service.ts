import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { JwtPayload } from './jwt-payload.interface';
import { LoginResponseInterface } from './interfaces/login.response.interface';
import { UserRepository } from './user.repository';
import { SignupResponseInterface } from './interfaces/signup.response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signup(authDto: AuthDto): Promise<SignupResponseInterface> {
    this.userRepository.createUser(authDto);
    return { success: true, message: 'user created successfully' };
  }
  async login(authDto: AuthDto): Promise<LoginResponseInterface> {
    const { email, password } = authDto;
    const user = await this.userRepository.findOneBy({
      email,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { email };
    const token = await this.jwtService.sign(payload);
    delete user.password;
    return {
      success: true,
      message: 'user logged in successfully',
      token,
    };
  }
}
