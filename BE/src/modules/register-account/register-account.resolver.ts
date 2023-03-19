import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RegisterAccountService } from './register-account.service';
import { RegisterAccount } from './entities/register-account.entity';
import { CreateRegisterAccountInput } from './dto/create-register-account.input';
import { UpdateRegisterAccountInput } from './dto/update-register-account.input';

@Resolver(() => RegisterAccount)
export class RegisterAccountResolver {
  constructor(
    private readonly registerAccountService: RegisterAccountService,
  ) {}

  @Mutation(() => RegisterAccount)
  createRegisterAccount(
    @Args('createRegisterAccountInput')
    createRegisterAccountInput: CreateRegisterAccountInput,
  ) {
    return this.registerAccountService.create(createRegisterAccountInput);
  }

  @Query(() => [RegisterAccount], { name: 'registerAccount' })
  findAll() {
    return this.registerAccountService.findAll();
  }

  @Query(() => RegisterAccount, { name: 'registerAccount' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.registerAccountService.findOne(id);
  }

  @Mutation(() => RegisterAccount)
  updateRegisterAccount(
    @Args('updateRegisterAccountInput')
    updateRegisterAccountInput: UpdateRegisterAccountInput,
  ) {
    return this.registerAccountService.update(
      updateRegisterAccountInput.id,
      updateRegisterAccountInput,
    );
  }

  @Mutation(() => RegisterAccount)
  removeRegisterAccount(@Args('id', { type: () => Int }) id: number) {
    return this.registerAccountService.remove(id);
  }
}
