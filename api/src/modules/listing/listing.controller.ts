import { Controller, Post, UsePipes, Param, Delete, Req, Get } from '@nestjs/common';
import { ListingService } from './listing.service';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { DTC } from 'dtc';
import { createListingSchema } from './schema/create-listing.schema';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createListingSchema))
  create(@Req() { body }: { body: DTC.CreateListing }) {
    return this.listingService.create(body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.listingService.delete(id);
  }

  @Get('band/:bandID')
  band(@Param('bandID') bandID: number) {
    return this.listingService.getBandListings(bandID);
  }
}
