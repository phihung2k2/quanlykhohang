import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int, { nullable: true })
  id: number;
}

@InputType()
export class UpdateProfileInput extends OmitType(UpdateUserInput, [
  'id',
] as const) {}
