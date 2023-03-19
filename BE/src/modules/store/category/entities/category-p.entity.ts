import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CategoryEntity {
  @Field(() => Int, { description: 'Id field' })
  id: number;
  
  @Field({ description: 'Name field' })
  name: string;
  
  @Field({ description: 'description field', nullable: true })
  description: string;
  
  @Field({ description: 'created field' })
  createdAt: string;
  
  @Field({ description: 'updated field' })
  updatedAt: string;
}
