import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Setlist } from '../setlist/setlist.entity';

@Entity()
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 140 })
  title: string;

  @Column({ length: 10 })
  key: string;

  @OneToOne(type => Setlist, setlist => setlist.slot)
  setlist: Setlist;
}
