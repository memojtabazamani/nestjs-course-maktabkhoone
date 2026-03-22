import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadFileDto } from './shared/dtos/upload-file.dto';
import { saveImage, saveImages } from './shared/utils/file-utils';
import { UploadFilesDto } from './shared/dtos/upload-files.dto';

@ApiTags('Shared')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload-file')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 20000000,
          }),
          new FileTypeValidator({
            fileType: 'image/png',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body: UploadFileDto,
  ) {
    return saveImage(file, body);
  }

  @Post('upload-files')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: UploadFilesDto,
  ) {
    return saveImages(files, body);
  }
}
