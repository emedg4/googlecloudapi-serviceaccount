import { Module } from '@nestjs/common';
import { GoogleDriveApiService } from './google-drive-api.service';
import { GoogleDriveApiController } from './google-drive-api.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [ MulterModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService:ConfigService) => ({
      dest: configService.get('upload_destination')
    }),
    inject: [ConfigService]
  })],
  providers: [GoogleDriveApiService],
  controllers: [GoogleDriveApiController]
})
export class GoogleDriveApiModule {}
