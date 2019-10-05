import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BandModule } from './modules/band/band.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './ormconfig';
import { AuthModule } from './modules/auth/auth.module';
import { RouterModule } from 'nest-router';
import { routes } from './app.routes';
import { MembershipModule } from './modules/membership/membership.module';
import { SetlistModule } from './modules/setlist/setlist.module';
import { SongModule } from './modules/song/song.module';
import { ListingModule } from './modules/listing/listing.module';
import { GigModule } from './modules/gig/gig.module';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    TypeOrmModule.forRoot(ormConfig),
    BandModule,
    UserModule,
    AuthModule,
    MembershipModule,
    SetlistModule,
    SongModule,
    ListingModule,
    GigModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
