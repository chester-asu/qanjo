import { Module } from '@nestjs/common';
import { GigController } from './gig.controller';

@Module({
  controllers: [GigController]
})
export class GigModule {}
