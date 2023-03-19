import { Category } from './../entities/category.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ListCategoryResponse {
  @Field(() => [Category])
  items: Category[];
}
