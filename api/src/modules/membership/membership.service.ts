import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from './membership.entity';
import { Repository, DeepPartial } from 'typeorm';
import { DTC } from 'dtc';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepo: Repository<Membership>,
  ) {}

  create({ userID, bandID }: DTC.CreateMembership): Promise<Membership> {
    const membership = {
      user: { id: userID },
      band: { id: bandID },
    };
    console.log(membership);
    return this.membershipRepo.save(membership);
  }

  findOne(membership: DeepPartial<Membership>): Promise<Membership> {
    return this.membershipRepo.findOne(membership);
  }

  async delete(id: number): Promise<any> {
    const membership = await this.findOne({ id });
    if (!membership) {
      throw new NotFoundException();
    }
    return this.membershipRepo.remove(membership);
  }
}
