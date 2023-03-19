import { CountCategoryEntity } from './count-category.entitiy';
import { ProductEntity } from './../../product/entities/product-p.entity';
import { CategoryEntity } from './category-p.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category extends CategoryEntity {
  @Field(() => [ProductEntity], { nullable: true })
  products: [ProductEntity];

  @Field(() => CountCategoryEntity, { nullable: true })
  _count: CountCategoryEntity;
}
