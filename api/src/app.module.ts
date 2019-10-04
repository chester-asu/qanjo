import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BandModule } from './band/band.module';
import { MembershipModule } from './membership/membership.module';
import { GigModule } from './gig/gig.module';
import { SetlistModule } from './setlist/setlist.module';
import { SetModule } from './set/set.module';
import { SongModule } from './song/song.module';
import { ListingModule } from './listing/listing.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    BandModule,
    MembershipModule,
    GigModule,
    SetlistModule,
    SetModule,
    SongModule,
    ListingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
