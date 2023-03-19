import { BadRequestException, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3';
import { FileUpload } from 'graphql-upload';

import { ConfigService } from '@nestjs/config';
import { FileService } from '../file.service';
const s3 = new S3({
  accessKeyId: 'AKIAY4OHRSKAPMJWTN4P',
  secretAccessKey: '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',
  sslEnabled: false,
  s3ForcePathStyle: true,
});

@Injectable()
export class AwsS3Service {
  constructor(
    private readonly configService: ConfigService,
    private readonly fileService: FileService,
  ) {}

  async uploadPublicImage(file: FileUpload, folder: string) {
    const { stream, filename } = await this.fileService.validateImage(file);

    const fileName = this.fileService.getFileName(filename);

    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: stream,
        ACL: 'public-read',
        // Expires: expires,
        Key: `${folder}/${fileName}`,
      })
      .promise();

    return uploadResult.Key;
  }

  async getCreateNameFile(file: FileUpload, keyName: string, folder?: string) {
    if (file) {
      const imgName = await this.uploadPublicImage(file, folder || '');
      return { [keyName]: imgName };
    } else {
      return { [keyName]: '' };
    }
  }

  async updateImage(file: FileUpload, folder: string, image: string) {
    await this.deleteImage(image);
    return await this.uploadPublicImage(file, folder);
  }

  async getUpdateNameFile(
    file: FileUpload | undefined,
    oldName: string,
    keyName: string,
    folder?: string,
  ) {
    if (file) {
      if (!!oldName) {
        const imgName = await this.updateImage(file, folder || '', oldName);
        return { [keyName]: imgName };
      } else {
        const imgName = await this.uploadPublicImage(file, folder || '');
        return { [keyName]: imgName };
      }
    } else {
      return {};
    }
  }

  async getImages(fileKey: string) {
    try {
      const s3Client = new S3Client({ region: 'ap-northeast-1' });

      const result = await s3Client.send(
        new ListObjectsCommand({
          Prefix: fileKey,
          Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        }),
      );

      return result.Contents;
    } catch (error) {
      throw new BadRequestException('Can not get image from S3');
    }
  }

  async deleteImage(fileKey: string) {
    try {
      const params = {
        Key: fileKey,
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
      };

      await s3.deleteObject(params).promise();
    } catch (e) {
      console.error(e);
    }
  }
}
