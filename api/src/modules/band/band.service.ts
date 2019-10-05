import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Band } from './band.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class BandService {
  constructor(
    @InjectRepository(Band) private readonly bandRepo: Repository<Band>,
  ) {}

  async create(band: { name: string; createdByUser: User }) {
    const bandIsUnqiue = await this.bandIsUnique(band);
    if (!bandIsUnqiue) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Band already exists',
        },
        400,
      );
    }
    return this.bandRepo.save(band);
  }

  private async bandIsUnique(band: {
    name: string;
    createdByUser: User;
  }): Promise<boolean> {
    const bands = await this.bandRepo.find(band);
    return bands.length === 0;
  }
}
