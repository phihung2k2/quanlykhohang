import { CacheSetupModule } from '@configs/cache/cache.module';
import { TwilioAppModule } from './configs/sms/twilio/twilio.module';
import { ThrottlerAppModule } from './configs/throttler-app/throttler-app.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLAppModule, ConfigAppModule } from './configs';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AccessTokenGuard } from './modules/auth/guard/access-token.guard';
import { FileModule } from '@configs/file/file.module';

import { PrismaModule } from '@configs/prisma/prisma.module';
import { AppFileModule } from '@configs/file/app-file.module';
import { ProductModule } from './modules/store/product/product.module';
import { CategoryModule } from './modules/store/category/category.module';
import { RegisterAccountModule } from './modules/register-account/register-account.module';

@Module({
  imports: [
    PrismaModule,
    ConfigAppModule,
    GraphQLAppModule,
    AuthModule,
    UserModule,
    ThrottlerAppModule,
    // TwilioAppModule,
    FileModule,
    CacheSetupModule,
    AppFileModule,
    ProductModule,
    CategoryModule,
    RegisterAccountModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
