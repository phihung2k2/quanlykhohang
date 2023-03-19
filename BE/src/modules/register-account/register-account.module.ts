import { Module } from '@nestjs/common';
import { RegisterAccountService } from './register-account.service';
import { RegisterAccountResolver } from './register-account.resolver';

@Module({
  providers: [RegisterAccountResolver, RegisterAccountService]
})
export class RegisterAccountModule {}
