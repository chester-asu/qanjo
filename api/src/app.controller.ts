import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  index(): object {
    return {
      apiVersion: '0.1.0',
    };
  }
}
