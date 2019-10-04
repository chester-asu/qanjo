import { Test, TestingModule } from '@nestjs/testing';
import { SlotController } from './slot.controller';

describe('Slot Controller', () => {
  let controller: SlotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlotController],
    }).compile();

    controller = module.get<SlotController>(SlotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
