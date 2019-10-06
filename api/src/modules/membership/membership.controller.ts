import {
  Controller,
  Post,
  UsePipes,
  Delete,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { MembershipService } from './membership.service';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { createMembershipSchema } from './schema/create-membership.schema';

@Controller('membership')
@UseGuards(AuthGuard('jwt'))
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createMembershipSchema))
  create(createMembershipDto: DTC.CreateMembership) {
    return this.membershipService.create(createMembershipDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.membershipService.delete(id);
  }
}
