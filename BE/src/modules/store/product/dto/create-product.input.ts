import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateProductPartialInput } from './create-product-partial.input';
import { InputType, Int, Field, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class CreateProductInput extends PartialType(CreateProductPartialInput) {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => Float)
  price: number;
  
  @Field(() => Int)
  quantity: number;
}
