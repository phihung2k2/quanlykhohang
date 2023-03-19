import { BadGatewayException, Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload';
import { join } from 'path';
import { FileService } from '../file.service';
import { createReadStream, readFileSync, unlink } from 'fs';
@Injectable()
export class LocalFileService {
  constructor(private readonly fileService: FileService) {}

  async uploadImage(file: FileUpload) {
    const { stream, filename, type } = await this.fileService.validateImage(
      file,
    );

    const filenameSlug = this.fileService.getFileName(filename);

    return new Promise(async (resolve) => {
      stream
        .pipe(
          createWriteStream(
            join(process.cwd(), `./upload/${filenameSlug}.${type}`),
          ),
        )
        .on('finish', () =>
          resolve({
            file: filenameSlug,
          }),
        )
        .on('error', () => {
          new BadGatewayException('Could not save image');
        });
    });
  }

  imageBuffer(name: string) {
    return readFileSync(join(process.cwd(), './upload/' + name));
  }

  imageStream(name: string) {
    return createReadStream(join(process.cwd(), './upload/' + name));
  }

  fileBuffer(name: string) {
    return readFileSync(join(process.cwd(), './upload/' + name));
  }

  fileStream(name: string) {
    return createReadStream(join(process.cwd(), './upload/' + name));
  }

  deleteFile(name: string) {
    unlink(join(process.cwd(), './upload/' + name), (err) => {
      if (err) {
        throw new BadGatewayException('err');
      }
    });
    return name + ' was deleted';
  }
}
