import { StatusE } from '../../../auth/status/status.enum';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductPartialInput {
  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  detail?: string;
}
