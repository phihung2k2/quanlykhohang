import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { EnvironmentEnums } from './../../../common/env/index';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
@Injectable()
export class AppService {
  private twilioClient;

  public constructor(
    private readonly configService: ConfigService,
  ) {
    const accountSid = this.configService.get(
      EnvironmentEnums.TWILIO_ACCOUNT_SID,
    );
    const authToken = this.configService.get(
      EnvironmentEnums.TWILIO_AUTH_TOKEN,
    );

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async initiatePhoneNumberVerification(phoneNumber: string) {
    const serviceSid = this.configService.get(
      EnvironmentEnums.TWILIO_VERIFICATION_SERVICE_SID,
    );

    const a = await this.twilioClient.verify
      .services(serviceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms', locale: 'en' });

    console.log(a);
  }

  async confirmPhoneNumber(phoneNumber: string, verificationCode: string) {
    const serviceSid = this.configService.get(
      EnvironmentEnums.TWILIO_VERIFICATION_SERVICE_SID,
    );

    const result = await this.twilioClient.verify
      .services(serviceSid)
      .verificationChecks.create({ to: phoneNumber, code: verificationCode });

    if (!result.valid || result.status !== 'approved') {
      throw new BadRequestException('Wrong code provided');
    }

    console.log(result);
  }
}
