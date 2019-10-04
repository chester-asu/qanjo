import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Membership } from '../membership/membership.entity';
import { Band } from '../band/band.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 60 })
  hashedPassword: string;

  @Column({ length: 150 })
  email: string;

  @OneToMany(type => Membership, membership => membership.user, {
    nullable: true,
  })
  memberships: Membership[];

  @OneToMany(type => Band, band => band.createdByUser, { nullable: true })
  createdBands: Band[];
}