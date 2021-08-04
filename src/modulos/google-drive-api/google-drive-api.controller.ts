import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { GoogleDriveApiService } from './google-drive-api.service';

@Controller('google-drive-api')
export class GoogleDriveApiController {
    constructor(private readonly googleDriveApiService: GoogleDriveApiService){  }

    @Post('upload')
    @UseInterceptors(AnyFilesInterceptor())
    async uploadFile(@UploadedFiles() files: Array <Express.Multer.File>, @Body() body:any) {
        const response: any = await this.googleDriveApiService.uploadFile(files[0].filename,body.num_telefono)
        console.log(response)
        if(response.meta.code == 200){
            return response
        }
    }
    @Get('download')
    async downloadFile (){}
}
