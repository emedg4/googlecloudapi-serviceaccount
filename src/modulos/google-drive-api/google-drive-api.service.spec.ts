import { Test, TestingModule } from '@nestjs/testing';
import { GoogleDriveApiService } from './google-drive-api.service';

describe('GoogleDriveApiService', () => {
  let service: GoogleDriveApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleDriveApiService],
    }).compile();

    service = module.get<GoogleDriveApiService>(GoogleDriveApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
