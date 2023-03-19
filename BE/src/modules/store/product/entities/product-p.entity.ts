import { StatusE } from '@modules/auth/status/status.enum';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProductEntity {
  @Field(() => Int, { description: 'Id field' })
  id: number;

  @Field(() => Int, { description: 'Id field' })
  categoryId: number;

  @Field({ description: 'Name field' })
  name: string;

  @Field({ description: 'description field', nullable: true })
  description: string;

  @Field({ description: 'Price field', nullable: true })
  price: number;
  
  @Field({ description: 'Quantity field', nullable: true })
  quantity: number;

  @Field({ description: 'detail field', nullable: true })
  detail: string;

  @Field({ description: 'created field' })
  createdAt: string;

  @Field({ description: 'updated field' })
  updatedAt: string;
}
