import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Song } from '../song/song.entity';
import { Setlist } from '../setlist/setlist.entity';

@Entity()
export class Listing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Song, song => song.listings)
  song: Song;

  @ManyToOne(type => Setlist, setlist => setlist.listings)
  setlist: Setlist;
}