import { FileUpload } from 'graphql-upload';
import { Field, InputType } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class CreateCatInput {
  @Field(() => GraphQLUpload)
  file: FileUpload;
}
