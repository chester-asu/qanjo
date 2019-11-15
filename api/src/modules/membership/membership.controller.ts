import {
  Controller,
  Post,
  UsePipes,
  Delete,
  Param,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { MembershipService } from './membership.service';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { createMembershipSchema } from './schema/create-membership.schema';
import { DTC } from 'dtc';

@Controller('membership')
@UseGuards(AuthGuard('jwt'))
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createMembershipSchema))
  create(@Req() { body }: { body: DTC.CreateMembership }) {
    return this.membershipService.create(body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.membershipService.delete(id);
  }
}
