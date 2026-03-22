import sharp from 'sharp';
import { mkdirp } from 'mkdirp';
import { UploadFileDto } from '../dtos/upload-file.dto';
import { UploadFilesDto } from '../dtos/upload-files.dto';
import * as fs from 'fs';
export const saveImage = async (
  file: Express.Multer.File,
  body: UploadFileDto,
) => {
  const destPath = 'files/' + body.folder;
  const d = new Date();
  const fileName =
    d.getHours() +
    d.getMinutes() +
    d.getMilliseconds() +
    '-' +
    file.originalname.split('.')[0] +
    '.webp';

  mkdirp.sync(destPath + '/main');
  mkdirp.sync(destPath + '/resized');

  await sharp(file.buffer)
    .webp()
    .toFile(destPath + '/main/' + fileName);
  await sharp(file.buffer)
    .resize({
      width: body.width || 200,
      height: body.height || 200,
    })
    .webp()
    .toFile(destPath + '/resized/' + fileName);

  return fileName;
};

export const saveImages = async (
  files: Array<Express.Multer.File>,
  body: UploadFilesDto,
) => {
  const destPath = 'files/' + body.folder;
  mkdirp.sync(destPath + '/main');
  mkdirp.sync(destPath + '/resized');
  const fileNames: string[] = [];
  for await (const file of files) {
    const d = new Date();
    const fileName: string =
      d.getHours() +
      d.getMinutes() +
      d.getMilliseconds() +
      '-' +
      file.originalname.split('.')[0] +
      '.webp';

    await sharp(file.buffer)
      .webp()
      .toFile(destPath + '/main/' + fileName);
    await sharp(file.buffer)
      .resize({
        width: body.width || 200,
        height: body.height || 200,
      })
      .webp()
      .toFile(destPath + '/resized/' + fileName);

    fileNames.push(fileName);
  }

  return fileNames;
};
export const deleteImage = async (fileName: string, folder: string = '') => {
  const imagePath = 'files/' + folder;

  try {
    await fs.promises.unlink(`${imagePath}/main/${fileName}`);
    await fs.promises.unlink(`${imagePath}/resized/${fileName}`);
  } catch (error) {
    console.log(error);
  }
};
