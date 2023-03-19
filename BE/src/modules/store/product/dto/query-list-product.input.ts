import { StatusE } from '@modules/auth/status/status.enum';
import { FilterByDateInput } from '@common/filter';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@InputType()
export class QueryListProduct extends FilterByDateInput {
  @Field(() => Number, { nullable: true })
  @IsNumber()
  categoryId: number;
}

@InputType()
export class QueryListProductInput extends PartialType(QueryListProduct) {}
