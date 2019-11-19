import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Repository } from 'typeorm';
import { DTC } from 'dtc';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song) private readonly songRepo: Repository<Song>,
  ) {}

  async create({ title, key, bandID }: DTC.CreateSong) {
    return this.songRepo.save({ title, key, band: { id: bandID } });
  }

  async update(song: DTC.EditSong) {
    return this.songRepo.save(song);
  }

  async delete(id: number) {
    return this.songRepo.delete(id);
  }

  async getBandSongs(bandID: number) {
    return this.songRepo.find({ band: { id: bandID } });
  }
}
