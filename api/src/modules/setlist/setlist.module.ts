import { Module } from '@nestjs/common';
import { SetlistController } from './setlist.controller';

@Module({
  controllers: [SetlistController]
})
export class SetlistModule {}
