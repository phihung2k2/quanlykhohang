import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CountCategoryEntity {
  @Field(() => Int)
  products: number;
}
