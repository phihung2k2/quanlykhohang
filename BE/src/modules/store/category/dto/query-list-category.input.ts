import { FilterByDateInput } from '@common/filter';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class QueryListCategory extends FilterByDateInput {
  @Field({ nullable: true })
  @IsString()
  name: string;
}

@InputType()
export class QueryListCategoryInput extends PartialType(QueryListCategory) {}
