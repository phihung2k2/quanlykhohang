import { LocalFileService } from './local-file.service';
import { Public } from '@modules/auth/role/public.decorator';
import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('file')
@SkipThrottle()
export class LocalFileController {
  constructor(private readonly localFileService: LocalFileService) {}
  @Get()
  @Public()
  getFile(): StreamableFile {
    const file = createReadStream(
      join(
        process.cwd(),
        './upload/screen-shot-2023-02-19-at-23.16.22-02c75a39.png',
      ),
    );
    return new StreamableFile(file);
  }

  @Get('buffer/:name')
  @Public()
  buffer(@Res() response: Response, @Param('name') name: string) {
    const file = this.localFileService.imageBuffer(name);
    response.send(file);
  }

  @Get('stream/:name')
  @Public()
  stream(@Res() response: Response, @Param('name') name: string) {
    const file = this.localFileService.imageStream(name);
    file.pipe(response);
  }

  @Get('streamable')
  @Public()
  streamable(
    @Res({ passthrough: true }) response: Response,
    @Param('name') name: string,
  ) {
    const file = this.localFileService.fileStream(name);
    // or
    // const file = this.downloadService.fileBuffer();
    return new StreamableFile(file); // 👈 supports Buffer and Stream
  }

  @Get('delete/:name')
  @Public()
  delete(@Param('name') name: string) {
    return this.localFileService.deleteFile(name);
  }
}
