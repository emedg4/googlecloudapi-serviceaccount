import { Test, TestingModule } from '@nestjs/testing';
import { GoogleDriveApiController } from './google-drive-api.controller';

describe('GoogleDriveApiController', () => {
  let controller: GoogleDriveApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleDriveApiController],
    }).compile();

    controller = module.get<GoogleDriveApiController>(GoogleDriveApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
