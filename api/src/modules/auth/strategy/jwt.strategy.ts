import { Strategy, JwtFromRequestFunction } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../../modules/user/user.service';

const jwtFromCookie: JwtFromRequestFunction = function(req) {
  if (req && req.cookies) {
    return req.cookies['access_token'];
  }
  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: jwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  /**
   * This is a "magic" method Passport will use to validate requests
   * made to enpoints using the `jwt` strategy
   */
  async validate(payload: JwtPayloadDto): Promise<UserDto> {
    const user = await this.userService.findOne(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
