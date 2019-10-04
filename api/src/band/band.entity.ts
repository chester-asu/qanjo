import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Membership } from '../membership/membership.entity';
import { Song } from '../song/song.entity';
import { Setlist } from '../setlist/setlist.entity';
import { Gig } from '../gig/gig.entity';
import { User } from '../user/user.entity';

@Entity()
export class Band {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 140 })
  name: string;

  @OneToMany(type => Membership, membership => membership.band)
  memberships: Membership[];

  @OneToMany(type => Song, song => song.band)
  songs: Song[];

  @OneToMany(type => Setlist, setlist => setlist.band)
  setlists: Setlist[];

  @OneToMany(type => Gig, gig => gig.band)
  gigs: Gig[];

  @ManyToOne(type => User, user => user.createdBands)
  createdByUser: User
}