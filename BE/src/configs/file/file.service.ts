import { makeSlug } from 'src/libs';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { FileUpload } from 'graphql-upload';

const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];

@Injectable()
export class FileService {
  getFileName(originalName: string) {
    const fileExtension: string = path.extname(originalName);
    const baseName = path.basename(originalName, fileExtension);
    const slugName = makeSlug().random(baseName);
    return slugName;
  }

  private async _checkFileSize(
    streams: FileUpload['createReadStream'],
    maxSize: number,
  ) {
    await new Promise((resolves, rejects) => {
      let filesize = 0;
      const stream = streams();
      stream.on('data', (chunk: Buffer) => {
        filesize += chunk.length;
        if (filesize > maxSize) {
          rejects(filesize);
        }
      });
      stream.on('end', () => resolves(filesize));
      stream.on('error', rejects);
    });
  }

  // image
  async validateImage(file: FileUpload) {
    const { createReadStream, mimetype, filename } = await file;
    const stream = createReadStream();

    if (!validMimeTypes.includes(mimetype)) {
      throw new BadRequestException('Can not upload this mime type');
    }

    const MaxAllowedFileSize = 10000000;
    try {
      await this._checkFileSize(createReadStream, MaxAllowedFileSize);
    } catch (error) {
      throw new BadRequestException(
        'Can not upload file larger than ' +
          MaxAllowedFileSize / 1000000 +
          'MB',
      );
    }

    const types = mimetype?.split('/');
    const type = types.length >= 2 ? types[1] : '';

    return { stream, filename, mimetype, type };
  }
}
