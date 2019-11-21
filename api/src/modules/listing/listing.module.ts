import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './listing.entity';
import { Setlist } from '../setlist/setlist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Listing]),
    TypeOrmModule.forFeature([Setlist]),
  ],
  controllers: [ListingController],
  providers: [ListingService],
})
export class ListingModule {}
