import {
  Controller,
  Post,
  UseGuards,
  UsePipes,
  Req,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { loginSchema } from './schema/login.schema';
import { AuthService } from './auth.service';
import { registerSchema } from './schema/register.schema';
import { Response, Request } from 'express';
import { DTC } from 'dtc';

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
  async login(@Req() { user }: Request & { user: DTC.User }): Promise<
    DTC.Token
  > {
    return await this.authService.login(user);
  }

  /**
   * Register a new users
   * @param registerDto new user's username, password and email address
   */
  @Post('register')
  @UsePipes(new JoiValidationPipe(registerSchema))
  async register(@Body() registerDto: DTC.Register): Promise<DTC.Token> {
    const user = await this.authService.register(registerDto);
    return await this.authService.login(user);
  }
}
