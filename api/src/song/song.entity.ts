import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Band } from '../band/band.entity';
import { Listing } from '../listing/listing.entity';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 140 })
  title: string;

  @Column({ length: 10 })
  key: string;

  @ManyToOne(type => Listing, listing => listing.song)
  listings: Listing[];

  @ManyToOne(type => Band, band => band.songs)
  band: Band;
}