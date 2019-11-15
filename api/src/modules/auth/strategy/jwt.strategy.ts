import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../../modules/user/user.service';
import { DTC } from 'dtc';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  /**
   * This is a "magic" method Passport will use to validate requests
   * made to enpoints using the `jwt` strategy
   */
  async validate(payload: DTC.JwtPayload): Promise<DTC.User> {
    const user = await this.userService.findOne(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
