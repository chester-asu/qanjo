import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Band } from '../band/band.entity';
import { User } from '../user/user.entity';

@Entity()
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.memberships)
  user: User;

  @ManyToOne(type => Band, band => band.memberships)
  band: Band;
}