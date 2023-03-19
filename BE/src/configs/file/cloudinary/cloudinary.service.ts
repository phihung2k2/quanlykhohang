import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { ListResourceClouldinary } from './models';
import { FileUpload } from 'graphql-upload';
import { FileService } from '../file.service';

@Injectable()
export class CloudinaryService {
  constructor(private readonly fileService: FileService) {}

  async getImages(folder: string): Promise<ListResourceClouldinary> {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: folder,
      });
      return result;
    } catch (error) {
      throw new BadRequestException('Can not get image from cloudinary');
    }
  }

  async uploadImage(file: FileUpload, folder: string) {
    const { stream, filename } = await this.fileService.validateImage(file);
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    try {
      const fileName = this.fileService.getFileName(filename);
      const streamUpload: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          const cloudStream = cloudinary.uploader.upload_stream(
            {
              folder: folder,
              public_id: fileName,
            },
            function (err, fileUploaded) {
              if (err) {
                reject(err);
              }

              resolve(fileUploaded);
            },
          );

          stream.pipe(cloudStream);
        },
      );

      const publicId = streamUpload.public_id;

      return publicId;
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  async updateImage(file: FileUpload, folder: string, image: string) {
    await this.deleteImage(image);
    return await this.uploadImage(file, folder);
  }

  async deleteImage(image: string) {
    try {
      await cloudinary.uploader.destroy(image);
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }
}
