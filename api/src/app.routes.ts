import { Routes } from 'nest-router';
import { UserModule } from './modules/user/user.module';
import { BandModule } from './modules/band/band.module';
import { AuthModule } from './modules/auth/auth.module';
import { GigModule } from './modules/gig/gig.module';
import { ListingModule } from './modules/listing/listing.module';
import { SetlistModule } from './modules/setlist/setlist.module';
import { SongModule } from './modules/song/song.module';

export const routes: Routes = [
  {
    path: 'v1',
    children: [
      AuthModule,
      UserModule,
      BandModule,
      GigModule,
      ListingModule,
      SetlistModule,
      SongModule,
    ],
  },
];
