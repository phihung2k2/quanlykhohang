import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Cat {
  @Field(() => String)
  file: string;
}
