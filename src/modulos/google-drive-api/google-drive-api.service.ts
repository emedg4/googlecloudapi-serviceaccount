import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'yargs';
import scopes from './scopes';
import { google } from 'googleapis';
import * as fs from 'fs';
@Injectable()
export class GoogleDriveApiService {
    constructor( private readonly configService:ConfigService ) {
    }

    public async uploadFile( fileName:String, num_telefono:String ): Promise<any> {
        const uploadPath: string = this.configService.get('upload_folder_route')
        const SCOPES: Array<string> = scopes();
        const keyFilePath: string = this.configService.get('googleDriveApi.keyFilePath');
        const file_name_phone: string =  `${num_telefono}-${fileName}.pdf`;

        const auth = new google.auth.GoogleAuth({
            keyFile: keyFilePath,
            scopes: SCOPES
        });
        const googleDrivePath: string = this.configService.get('googleDriveApi.googleDrivePath');
        const driveService: any = google.drive({ version: 'v3', auth });
        const fileMetaData = {
            'name': file_name_phone,
            'parents': [googleDrivePath]
        }
        const media = {
            mimeType: 'application/pdf',
            body: fs.createReadStream(`${uploadPath}/${fileName}`)
        }

        const driveResponse = await driveService.files.create({
            resource : fileMetaData,
            media: media,
            fields: 'id'
        });
        if(driveResponse.status == 200) {
            console.log('File Created id: ', driveResponse.data.id)
            const response = {
                meta: {
                    code:200,
                    action: "Upload file"
                },
                data: {
                    'itemId': driveResponse.data.id,
                    'fileName': file_name_phone,
                    'phone': num_telefono
                }
            }
            
            return response;
        }
    }

    public async getDownloadLink(fileId: string) {
        const SCOPES: Array<string> = scopes();
        const keyFilePath: string = this.configService.get('googleDriveApi.keyFilePath');
        
        const auth = new google.auth.GoogleAuth({
            keyFile: keyFilePath,
            scopes: SCOPES
        });

        const driveService = google.drive({ version: 'v3', auth });
        await driveService.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });
        const result = await driveService.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink'
        });
        const response = {
            meta: {
                code: 200,
                action: 'Download file'
            },
            data: {
                webContentLink: result.data.webContentLink,
                webViewLink: result.data.webViewLink
            }
        }
        return response;

    }
}
