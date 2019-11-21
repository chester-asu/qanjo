import {
  Controller,
  Post,
  Req,
  UsePipes,
  Patch,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { DTC } from 'dtc';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { SetlistService } from './setlist.service';
import { createSetlistSchema } from './schema/create-setlist.schema';
import { editSetlistSchema } from './schema/edit-setlist.schema';

@Controller('setlist')
export class SetlistController {
  constructor(private readonly setlistService: SetlistService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createSetlistSchema))
  create(@Req() { body }: { body: DTC.CreateSong }) {
    return this.setlistService.create(body);
  }

  @Patch()
  @UsePipes(new JoiValidationPipe(editSetlistSchema))
  update(@Req() { body }: { body: DTC.EditSetlist }) {
    return this.setlistService.update(body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.setlistService.delete(id);
  }

  @Get('band/:bandID')
  band(@Param('bandID') bandID: number) {
    return this.setlistService.getBandSetlists(bandID);
  }
}
