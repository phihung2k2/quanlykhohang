import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';
import { LocalFileModule } from './local/local-file.module';
import { AwsS3Module } from './s3-aws/aws-s3.module';

@Module({
  imports: [LocalFileModule, AwsS3Module, CloudinaryModule],
})
export class AppFileModule {}
