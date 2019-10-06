import {
  Controller,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { createUserSchema } from './schema/create-user.schema';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

}
