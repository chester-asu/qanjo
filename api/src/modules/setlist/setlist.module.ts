import { Module } from '@nestjs/common';
import { SetlistController } from './setlist.controller';
import { SetlistService } from './setlist.service';
import { Setlist } from './setlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Setlist])],
  controllers: [SetlistController],
  providers: [SetlistService]
})
export class SetlistModule {}
