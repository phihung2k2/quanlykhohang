import { DetailUserResponse } from './../user/dto/detail-user.response';
import { UpdateUserInput } from './../user/dto/update-user.input';
import { ChangePasswordInput } from './dto/change-password.input';
import { SigninInput } from './dto/signin.input';
import { NewTokensResponse } from './dto/new-tokens.response';
import { LogoutResponse } from './dto/logout.response';
import { SignResponse } from './dto/sign-response';
import { User } from 'src/modules/user/entities/user.entity';
import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Public } from './role/public.decorator';
import { CurrentUserId } from './decorator/current-user-id.decorator';
import { CurrentUser } from './decorator/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from './guard/refresh-token.guard';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignResponse)
  @Public()
  login(@Args('signinAuth') signinInput: SigninInput) {
    return this.authService.login(signinInput);
  }

  @Query(() => NewTokensResponse)
  @UseGuards(RefreshTokenGuard)
  @Public()
  getNewTokens(
    @CurrentUserId() userId: number,
    @CurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.getNewTokens(userId, refreshToken);
  }

  @Mutation(() => LogoutResponse)
  @Public()
  logout(@Args('id', { type: () => Int }) userId: number) {
    return this.authService.logout(userId);
  }

  @Mutation(() => User)
  @Public()
  changePass(
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
    @Args('updateUserInput', { nullable: true })
    updateUserInput?: UpdateUserInput,
  ) {
    return this.authService.changePassword(
      changePasswordInput,
      updateUserInput,
    );
    // return 'ok'
  }
}
