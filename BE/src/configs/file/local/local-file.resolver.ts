import { Public } from '@modules/auth/role/public.decorator';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Cat } from './dto/out';
import { LocalFileService } from './local-file.service';

@Resolver()
export class LocalFileResolver {
  constructor(private readonly localFileService: LocalFileService) {}

  @Mutation(() => Cat)
  @Public()
  async upload(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ) {
    const data = await this.localFileService.uploadImage(file);

    return data;
  }
}
