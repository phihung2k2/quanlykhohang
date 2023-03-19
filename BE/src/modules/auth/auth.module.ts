import { forwardRef } from '@nestjs/common/utils';
import { UserModule } from './../user/user.module';
import { EmailModule } from './../../configs/email/email.module';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@configs/prisma/prisma.module';
import { FirebaseModule } from '@configs/firebase/firebase.module';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  imports: [
    PrismaModule,
    JwtModule,
    EmailModule,
    forwardRef(() => UserModule),
    FirebaseModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
