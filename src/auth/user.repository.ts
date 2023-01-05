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
import { CompleteProfileDto } from '../users/dto/profile.dto';
import { GetUserDto } from '../users/dto/get-users-dto';

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

  async completeProfile(
    user: User,
    completeProfileDto: CompleteProfileDto,
  ): Promise<User> {
    const { name, country, phone, city, address } = completeProfileDto;
    user.name = name;
    user.country = country;
    user.address = address;
    user.phone = phone;
    user.city = city;
    await this.save(user);
    delete user.password;
    return user;
  }
  /**
   * Getting all users
   * By Filtering
   * Or without filtering
   */
  async getAllUsers(getUserDto: GetUserDto): Promise<User[]> {
    const { search } = getUserDto;
    const query = await this.createQueryBuilder('user');
    query.select([
      'user.id',
      'user.name',
      'user.phone',
      'user.email',
      'user.city',
      'user.address',
      'user.country',
    ]);
    if (search) {
      query.where('LOWER(user.name) LIKE LOWER(:search) ', {
        search: `%${search}%`,
      });
    }
    const users = await query.getMany();
    return users;
  }
}
