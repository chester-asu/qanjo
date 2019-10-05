import { Controller, Post, UseGuards, UsePipes, Req } from '@nestjs/common';
import { BandService } from './band.service';
import { AuthGuard } from '@nestjs/passport';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { createBandSchema } from './schema/create-band.schema';
import { Band } from './band.entity';
import { User } from '../user/user.entity';

@Controller('band')
@UseGuards(AuthGuard('jwt'))
export class BandController {
  constructor(private readonly bandService: BandService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createBandSchema))
  create(@Req() { body, user }: { body: CreateBandDto; user: User }): Promise<
    Band
  > {
    const band = { ...body, createdByUser: user };
    return this.bandService.create(band);
  }
}
