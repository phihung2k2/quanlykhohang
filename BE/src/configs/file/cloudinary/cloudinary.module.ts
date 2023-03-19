import { Module } from '@nestjs/common';
import { FileModule } from '../file.module';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService],
  imports: [FileModule],
})
export class CloudinaryModule {}
