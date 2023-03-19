import { Module } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { AwsS3Resolver } from './aws-s3.resolver';
import { FileModule } from '../file.module';

@Module({
  providers: [AwsS3Resolver, AwsS3Service],
  exports: [AwsS3Service],
  imports: [FileModule],
})
export class AwsS3Module {}
