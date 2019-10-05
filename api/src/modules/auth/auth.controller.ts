import {
  Controller,
  Post,
  UseGuards,
  UsePipes,
  Req,
  Body,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { loginSchema } from './schema/login.schema';
import { AuthService } from './auth.service';
import { registerSchema } from './schema/register.schema';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login an existing user
   * @param res.user Express request object (Passport will auto-magically attach the validated user)
   * @param res Express response object
   */
  @Post('login')
  @UseGuards(AuthGuard('local'))
  @UsePipes(new JoiValidationPipe(loginSchema))
  async login(
    @Req() { user }: Request & { user: UserDto },
    @Res() res: Response,
  ): Promise<Response> {
    const { access_token } = await this.authService.login(user);
    return res
      .cookie('access_token', access_token, {
        expires: new Date(Date.now() + 900000),
      })
      .send(user);
  }

  /**
   * Register a new users
   * @param registerDto new user's username, password and email address
   */
  @Post('register')
  @UsePipes(new JoiValidationPipe(registerSchema))
  async register(
    @Body() registerDto: RegisterDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.authService.register(registerDto);
    const { access_token } = await this.authService.login(user);
    return res
      .cookie('access_token', access_token, {
        expires: new Date(Date.now() + 900000),
      })
      .send(user);
  }

  /**
   * Authenticates a user using the JWT stored inside an HTTP-Only cookie
   */
  @Post('authenticate')
  @UseGuards(AuthGuard('jwt'))
  async authentiucate(@Req() { user }: { user: UserDto }): Promise<UserDto> {
    return user;
  }
}
