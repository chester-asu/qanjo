import {
  Controller,
  UseGuards,
  Post,
  UsePipes,
  Req,
  Param,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { DTC } from 'dtc';
import { SongService } from './song.service';
import { createSongSchema } from './schema/create-song.schema';

@Controller('song')
@UseGuards(AuthGuard('jwt'))
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createSongSchema))
  create(@Req() { body }: { body: DTC.CreateSong }) {
    return this.songService.create(body);
  }

  @Get('band/:bandID')
  band(@Param('bandID') bandID: number) {
    return this.songService.getBandSongs(bandID);
  }
}
