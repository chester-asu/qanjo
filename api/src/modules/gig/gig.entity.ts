import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Band } from '../band/band.entity';
import { Setlist } from '../setlist/setlist.entity';
import { Slot } from '../slot/slot.entity';

@Entity()
export class Gig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 140 })
  venue: string;

  @Column()
  time: Date;

  @ManyToOne(type => Band, band => band.gigs)
  band: Band;

  @OneToOne(type => Setlist, setlist => setlist.slot)
  slots: Slot;
}