import { Injectable } from '@nestjs/common';
import { Listing } from './listing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DTC } from 'dtc';
import { Setlist } from '../setlist/setlist.entity';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepo: Repository<Listing>,
    @InjectRepository(Setlist)
    private readonly setlistRepo: Repository<Setlist>,
  ) {}

  async create({ songID, setlistID }: DTC.CreateListing) {
    return this.listingRepo.save({
      setlist: { id: setlistID },
      song: { id: songID },
    });
  }

  async delete(id: number) {
    return this.listingRepo.delete(id);
  }

  async getBandListings(bandID: number) {
    const setlists = await this.setlistRepo.find({
      relations: ['listings', 'listings.song', 'listings.setlist'],
      where: { band: { id: bandID } },
    });
    return setlists.reduce((listings, setlist) => {
      return listings.concat(setlist.listings);
    }, []);
  }
}
