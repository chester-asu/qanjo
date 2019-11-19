import {
  Controller,
  UseGuards,
  Post,
  UsePipes,
  Req,
  Param,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { DTC } from 'dtc';
import { SongService } from './song.service';
import { createSongSchema } from './schema/create-song.schema';
import { editSongSchema } from './schema/edit-song.schema';

@Controller('song')
@UseGuards(AuthGuard('jwt'))
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createSongSchema))
  create(@Req() { body }: { body: DTC.CreateSong }) {
    return this.songService.create(body);
  }

  @Patch()
  @UsePipes(new JoiValidationPipe(editSongSchema))
  update(@Req() { body }: { body: DTC.EditSong }) {
    return this.songService.update(body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.songService.delete(id);
  }

  @Get('band/:bandID')
  band(@Param('bandID') bandID: number) {
    return this.songService.getBandSongs(bandID);
  }
}
