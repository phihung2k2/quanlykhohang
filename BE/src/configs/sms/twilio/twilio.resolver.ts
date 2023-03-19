import { Public } from './../../../modules/auth/status/public.decorator';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AppService } from './twilio.service';

@Resolver()
export class TwilioResolver {
  constructor(private readonly twilioService: AppService) {}

  @Mutation(() => String)
  @Public()
  async phoneVer(
    @Args('phoneNumber')
    phoneNumber: string,
  ) {
    const data = await this.twilioService.initiatePhoneNumberVerification(
      phoneNumber,
    );

    return 'ok';
  }

  @Mutation(() => String)
  @Public()
  async phoneConf(
    @Args('phoneNumber')
    phoneNumber: string,
    @Args('veri')
    veri: string,
  ) {
    const data = await this.twilioService.confirmPhoneNumber(phoneNumber, veri);

    return 'ok';
  }
}
