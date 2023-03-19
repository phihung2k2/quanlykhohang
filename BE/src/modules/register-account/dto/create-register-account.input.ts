import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRegisterAccountInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
