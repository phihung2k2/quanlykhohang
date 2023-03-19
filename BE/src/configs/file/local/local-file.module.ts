import { Module } from '@nestjs/common';
import { LocalFileResolver } from './local-file.resolver';
import { LocalFileService } from './local-file.service';
import { LocalFileController } from './local-file.controller';
import { FileModule } from '../file.module';

@Module({
  providers: [LocalFileService, LocalFileResolver],
  exports: [LocalFileService],
  controllers: [LocalFileController],
  imports: [FileModule],
})
export class LocalFileModule {}
