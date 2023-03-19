import { CreateUserInput } from './dto/create-user.input';
import { QueryListUserInput } from './dto/query-list-user.input';
import { RoleE } from 'src/modules/auth/role/roles.enum';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateProfileInput, UpdateUserInput } from './dto/update-user.input';
import { ListUserResponse } from './dto/list-user.response';
import { PaginateInput } from '@common/meta-list';
import { DetailUserResponse } from './dto/detail-user.response';
import { Public } from '../auth/role/public.decorator';
import { CurrentUserId } from '../auth/decorator/current-user-id.decorator';
import { Roles } from '../auth/role/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guard/role.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => ListUserResponse, { name: 'users' })
  @UseGuards(RolesGuard)
  @Roles(RoleE.Admin)
  findAll(
    @Args('paginateInput')
    paginateInput: PaginateInput,
    @Args('queryListUserInput', { nullable: true })
    queryListUserInput?: QueryListUserInput,
  ) {
    return this.userService.findAll(paginateInput, queryListUserInput);
  }

  @Query(() => DetailUserResponse, { name: 'user' })
  @UseGuards(RolesGuard)
  @Roles(RoleE.Admin)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => DetailUserResponse)
  @Public()
  async createUser(
    @Args('createUserInput')
    createUserInput: CreateUserInput,
  ) {
    const data = await this.userService.create(createUserInput);

    return data;
  }

  @Mutation(() => DetailUserResponse)
  @Public()
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => DetailUserResponse)
  @UseGuards(RolesGuard)
  @Roles(RoleE.Admin)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  // personal
  @Query(() => DetailUserResponse, { name: 'profile' })
  getProfile(@CurrentUserId() userId: number) {
    return this.userService.findOne(userId);
  }

  @Mutation(() => DetailUserResponse)
  @Public()
  updateProfile(
    @CurrentUserId() userId,
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    const updateUserInput: UpdateUserInput = {
      id: userId,
      ...updateProfileInput,
    };

    return this.userService.update(userId, updateUserInput);
  }
}
