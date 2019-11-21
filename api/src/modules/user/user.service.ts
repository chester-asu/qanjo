import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, FindConditions } from 'typeorm';
import { User } from './user.entity';
import * as Bcrypt from 'bcrypt';
import { DTC } from 'dtc';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(registerDto: DTC.Register): Promise<User> {
    const hashedPassword = await Bcrypt.hash(registerDto.password, 12);
    const user = { hashedPassword, ...registerDto };
    const userIsUnique = await Promise.all([
      this.propertyIsUnique({ username: user.username }),
      this.propertyIsUnique({ email: user.email }),
    ]).then(checks => checks.every(isUnique => isUnique));

    if (!userIsUnique) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'User already exists',
        },
        409,
      );
    }

    return this.userRepo.save(user);
  }

  async update(id: number, updateUserDto: DTC.UpdateUser): Promise<User> {
    const user = await this.findOne({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return this.userRepo.save({ ...updateUserDto, id });
  }

  async findOne(user: DeepPartial<User>): Promise<DTC.User> {
    return this.userRepo.findOne(user).then(({ username, id, email }) => {
      return { username, id, email };
    });
  }

  async findOneWithPassword(user: DeepPartial<User>): Promise<User> {
    return this.userRepo.findOne(user);
  }

  private async propertyIsUnique(
    conditions: FindConditions<User>,
  ): Promise<boolean> {
    const users = await this.userRepo.find(conditions);
    return users.length === 0;
  }
}
