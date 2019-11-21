import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Band } from '../band/band.entity';
import { Listing } from '../listing/listing.entity';
import { Slot } from '../slot/slot.entity';

@Entity()
export class Setlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 140 })
  title: string;

  @OneToMany(type => Listing, listing => listing.setlist)
  listings: Listing[];

  @ManyToOne(type => Band, band => band.setlists)
  band: Band;

  @OneToOne(type => Slot, slot => slot.setlist)
  slot: Slot;
}
