import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as Bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Determine if a credential belongs to a valid user
   */
  async validateUser({
    username,
    password,
  }: DTC.Login): Promise<DTC.JwtPayload> {
    const {
      hashedPassword,
      email,
      id,
    } = await this.userService.findOneWithPassword({ username });
    if (hashedPassword) {
      const validPassword = await Bcrypt.compare(password, hashedPassword);
      if (validPassword) {
        return { username, email, id };
      }
    }
    return null;
  }

  /**
   * Sign and return a JWT for a user that has already been validated
   */
  async login(payload: DTC.User): Promise<{ access_token: string }> {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: DTC.Register): Promise<DTC.User> {
    const { username, email, id } = await this.userService.create(registerDto);
    return { username, email, id };
  }
}
