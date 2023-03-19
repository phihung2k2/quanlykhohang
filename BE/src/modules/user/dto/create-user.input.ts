import { CreateUserPartialInput } from './create-user-partial.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput extends PartialType(CreateUserPartialInput) {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString()
  firstname!: string;
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString()
  lastname!: string;
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  password!: string;
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
