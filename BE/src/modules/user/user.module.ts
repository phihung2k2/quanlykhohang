import { CacheSetupModule } from '@configs/cache/cache.module';

import { FileModule } from '@configs/file/file.module';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common/utils';
import { AuthModule } from './../auth/auth.module';
import { EmailModule } from './../../configs/email/email.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaModule } from '@configs/prisma/prisma.module';

@Module({
  providers: [UserResolver, UserService],
  imports: [
    PrismaModule,
    JwtModule,
    EmailModule,
    FileModule,
    CacheSetupModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
