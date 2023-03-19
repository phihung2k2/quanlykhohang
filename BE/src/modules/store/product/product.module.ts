import { AwsS3Module } from './../../../configs/file/s3-aws/aws-s3.module';
import { PrismaModule } from '@configs/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';

@Module({
  providers: [ProductResolver, ProductService],
  imports: [PrismaModule, AwsS3Module]
})
export class ProductModule {}
