import sharp from 'sharp';
import { mkdirp } from 'mkdirp';
import { UploadFileDto } from '../dtos/upload-file.dto';

export const saveImage = async (
  file: Express.Multer.File,
  body: UploadFileDto,
) => {
  const destPath = 'files/' + body.folder;
  const d = new Date();
  const fileName = (d.getHours() + d.getMinutes() + d.getMilliseconds()) + '-' + file.originalname;

  mkdirp.sync(destPath);

  await sharp(file.buffer).toFile(destPath + "/" + fileName);

  return fileName;
};
