import { CategoryEntity } from './../../category/entities/category-p.entity';
import { ProductEntity } from './product-p.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Product extends ProductEntity {
  @Field(() => CategoryEntity, { nullable: true })
  category: CategoryEntity;
}
