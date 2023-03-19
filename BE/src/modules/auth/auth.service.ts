import { SigninInput } from './dto/signin.input';
import { UpdateUserInput } from './../user/dto/update-user.input';
import { ChangePasswordInput } from './dto/change-password.input';
import { EmailService } from './../../configs/email/email.service';
import { UserService } from './../user/user.service';
import { AuthConfig } from './config/index';
import { RoleE } from 'src/modules/auth/role/roles.enum';
import { LogoutResponse } from './dto/logout.response';
import { SignResponse } from './dto/sign-response';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateTokenI, CreateTokensI } from './types';
import { getTimeAccessToken } from 'src/utils/time/get-time-access-token.fun';
import { Inject } from '@nestjs/common/decorators';
import { forwardRef } from '@nestjs/common/utils';
import { PrismaService } from '@configs/prisma/prisma.service';
import { FirebaseService } from '@configs/firebase/firebase.service';
import { hashCode } from '../../libs/hash/index';
const { Jwt } = AuthConfig;

const { access_token_time, refressh_token_time } = Jwt;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async verifyEmail(token: string) {
    const payload = await this.jwtService.verify(token, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
    });

    const email = payload.data[0].email;

    if (typeof payload === 'object' && email) {
      return true;
    }

    return false;
  }

  async createToken(...data): Promise<CreateTokenI> {
    const dataSign = { data };
    const accessToken = await this.jwtService.sign(
      { ...dataSign },
      {
        expiresIn: access_token_time,
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      },
    );

    return { accessToken };
  }

  async createTokens(
    userId: number,
    email: string,
    role: RoleE,
  ): Promise<CreateTokensI> {
    const dataSign = { userId, email, role };
    const accessToken = await this.jwtService.sign(
      { ...dataSign },
      {
        expiresIn: access_token_time,
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      },
    );
    const refreshToken = await this.jwtService.sign(
      { ...dataSign, accessToken },
      {
        expiresIn: refressh_token_time,
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async getNewTokens(userId: number, rft: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    const { hashedRefreshToken } = user;
    const isRefreshTokenMatch = await hashCode().verifyCode(
      hashedRefreshToken,
      rft,
    );
    if (!isRefreshTokenMatch) {
      throw new ForbiddenException('Access denied');
    }

    const { accessToken } = await this.createTokens(
      user.id,
      user.email,
      user.role as any,
    );

    const expiredAt = getTimeAccessToken(access_token_time);

    return {
      accessToken,
      refreshToken: rft,
      expiredAt,
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await hashCode().hash(refreshToken);

    const id = userId;

    await this.prisma.user.update({
      where: { id },
      data: { hashedRefreshToken },
    });
  }

  async login(signinInput: SigninInput): Promise<SignResponse> {
    const { email: emailLogin, password } = signinInput;

    const user = await this.prisma.user.findUnique({
      where: { email: emailLogin },
    });

    if (!user) {
      throw new ForbiddenException('Not found user');
    }

    const { hashedPassword } = user;

    const isPasswordMatch = await hashCode().verifyCode(
      hashedPassword,
      password,
    );

    if (!isPasswordMatch) {
      throw new ForbiddenException('Wrong password');
    }

    const userId = user.id;
    const email = user.email;
    const role = user.role;
    const userData = {
      userId,
      email,
      role,
    };

    const { refreshToken, accessToken } = await this.createTokens(
      userId,
      email,
      role as any,
    );

    await this.updateRefreshToken(userId, refreshToken);

    const expiredAt = getTimeAccessToken('5M');

    const result = {
      user: userData,
      refreshToken,
      accessToken,
      expiredAt,
    };

    return result;
  }

  async logout(userId: number): Promise<LogoutResponse> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: { hashedRefreshToken: null },
    });

    return {
      isLoggedOut: true,
    };
  }

  async changePassword(
    changePasswordInput: ChangePasswordInput,
    updateUserInput: UpdateUserInput,
  ) {
    const { email } = changePasswordInput;
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    const id = user.id;
    const password = user.hashedPassword;

    if (!user) {
      throw new ForbiddenException('Not found user');
    }

    return await this.userService.update(
      id,
      updateUserInput,
      password,
      changePasswordInput.newPassword,
      changePasswordInput.confirmPassword,
    );
  }
}
