import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * This is a "magic" method Passport will use to validate requests
   * made to enpoints using the `local` strategy
   */
  async validate(username: string, password: string): Promise<DTC.User> {
    const jwtPayload = await this.authService.validateUser({
      username,
      password,
    });
    if (!jwtPayload) {
      throw new UnauthorizedException();
    }
    return jwtPayload;
  }
}
