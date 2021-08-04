import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './base/configuration/configuration';
import { GoogleDriveApiModule } from './modulos/google-drive-api/google-drive-api.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    GoogleDriveApiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  
}
