import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletsRepository } from '../wallets/wallets.repository';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(WalletsRepository)
    private readonly walletsRepository: WalletsRepository,
  ) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(authDto: AuthDto): Promise<User> {
    const { email, password } = authDto;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = this.create({ email, password: hash });
    // creating new user
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    // creating user balance
    const query = await this.createQueryBuilder('user');
    query.where({ email });
    query.orderBy('created_at', 'DESC');
    const createdUser = await query.getOne();
    const wallet = this.walletsRepository.create({
      amount: 0,
      balance: 0,
      user: createdUser,
      reason: 'initial balance',
    });
    await this.walletsRepository.save(wallet);
    // removing user password before return statement
    delete createdUser.password;
    return createdUser;
  }
}
