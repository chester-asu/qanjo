import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Setlist } from './setlist.entity';
import { Repository } from 'typeorm';
import { DTC } from 'dtc';

@Injectable()
export class SetlistService {
  constructor(
    @InjectRepository(Setlist) private readonly setlistRepo: Repository<Setlist>,
  ) {}

  async create({ title, bandID }: DTC.CreateSetlist) {
    return this.setlistRepo.save({ title, band: { id: bandID } });
  }

  async update(setlist: DTC.EditSetlist) {
    return this.setlistRepo.save(setlist);
  }

  async delete(id: number) {
    return this.setlistRepo.delete(id);
  }

  async getBandSetlists(bandID: number) {
    return this.setlistRepo.find({ band: { id: bandID } });
  }
}
