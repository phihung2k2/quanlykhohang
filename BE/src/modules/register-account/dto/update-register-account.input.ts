import { CreateRegisterAccountInput } from './create-register-account.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRegisterAccountInput extends PartialType(
  CreateRegisterAccountInput,
) {
  @Field(() => Int)
  id: number;
}
