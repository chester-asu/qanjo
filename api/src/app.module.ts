import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { BandModule } from './modules/band/band.module';
import { MembershipModule } from './modules/membership/membership.module';
import { GigModule } from './modules/gig/gig.module';
import { SetlistModule } from './modules/setlist/setlist.module';
import { SlotModule } from './modules/slot/slot.module';
import { SongModule } from './modules/song/song.module';
import { ListingModule } from './modules/listing/listing.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './ormconfig';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    BandModule,
    MembershipModule,
    GigModule,
    SetlistModule,
    SongModule,
    ListingModule,
    SlotModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
