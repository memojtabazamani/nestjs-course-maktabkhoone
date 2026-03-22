import sharp from 'sharp';
import { mkdirp } from 'mkdirp';
import { UploadFileDto } from '../dtos/upload-file.dto';

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
    file.originalname.split('.')[0] + ".webp";

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
