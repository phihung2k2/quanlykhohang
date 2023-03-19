import { StatusE } from './../../auth/status/status.enum';
import { RoleE } from 'src/modules/auth/role/roles.enum';
import { checkRoleMiddleware } from '@configs/graphql/middleware/check-role.middleware';
import { ObjectType, Field, Int, Extensions } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'Id user', nullable: true })
  id: number;

  @Field({ nullable: true })
  role: RoleE;

  @Field({ nullable: true })
  status: StatusE;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  firstname: string;

  @Field({ nullable: true })
  lastname: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  hashedPassword: string;

  @Field({ nullable: true })
  hashedRefreshToken: string;

  @Field({ nullable: true })
  dob: Date;

  @Field({ middleware: [checkRoleMiddleware] })
  @Extensions({ role: RoleE.Admin })
  updatedAt: Date;

  @Field()
  createdAt: Date;
}
