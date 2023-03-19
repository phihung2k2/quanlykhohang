import { MetaList } from '@common/meta-list';
import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';

@ObjectType()
export class ListProductResponse extends MetaList {
  @Field(() => [Product])
  data: Product[];
}
