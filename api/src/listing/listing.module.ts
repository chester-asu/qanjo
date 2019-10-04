import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';

@Module({
  controllers: [ListingController]
})
export class ListingModule {}
