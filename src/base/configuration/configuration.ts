export default () => ({
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    upload_destination: process.env.APP_UPLOAD_DESTINY,
    upload_folder_route: process.env.UPLOAD_FOLDER_ROUTE,
    googleDriveApi: {
        keyFilePath: process.env.KEYFILEPATH,
        googleDrivePath: process.env.GOOGLE_DRIVE_PATH
    }

});
