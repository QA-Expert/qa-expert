import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { UserInputLogin } from '../users/login-user.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserOutputLogin } from '../users/login-user.output';
import { ConfigService } from '../config/config.service';
import { UserBaseModel } from 'src/modules/users/user-base.model';
import { SocialAuthInput, SocialProvider } from './social-auth.input';
import { OAuth2Client } from 'google-auth-library';
import { UserInputCreate } from '../users/create-user.input';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async validateUserAndLogin(data: UserInputLogin) {
    const result = await this.usersService.findByEmail(data.email);

    const match = await bcrypt.compare(data.password, result.hashedPassword);

    if (match) {
      const user = {
        _id: result._id,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
        roles: result.roles,
      };

      return await this.login(user);
    }

    throw new UnauthorizedException('Incorrect credentials');
  }

  async login(data: UserBaseModel) {
    const user: UserOutputLogin = {
      ...data,
      access_token: await this.jwtService.signAsync(
        { ...data },
        {
          secret: this.configService.authSecret,
          expiresIn: this.configService.authTokenExpiresIn,
        },
      ),
    };

    return user;
  }

  async register(data: UserInputLogin) {
    const user = await this.usersService.create(data);

    return await this.login({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
    });
  }

  async loginSocial(data: SocialAuthInput) {
    {
      const userInfo = await this.#getUserInfoFromSocialProvider(data);

      if (!userInfo) {
        throw new UnauthorizedException(
          `Failed to login with ${data.provider}`,
        );
      }

      const userFromDb = await this.usersService.findByEmail(userInfo.email);

      const user: UserBaseModel = {
        _id: userFromDb._id,
        email: userFromDb.email,
        firstName: userFromDb.firstName,
        lastName: userFromDb.lastName,
        roles: userFromDb.roles,
      };

      return await this.login(user);
    }
  }

  async registerSocial(data: SocialAuthInput) {
    const userInfo = await this.#getUserInfoFromSocialProvider(data);

    if (!userInfo) {
      throw new UnauthorizedException(
        `Failed to register with ${data.provider}`,
      );
    }

    const userData: UserInputCreate = {
      ...userInfo,
      password: randomStringGenerator(),
    };

    const newRegisteredUser = await this.register(userData);

    return await this.login(newRegisteredUser);
  }

  async #getUserInfoFromSocialProvider({
    provider,
    accessToken,
    userId,
  }: SocialAuthInput) {
    let userInfo: Pick<UserBaseModel, 'email' | 'firstName' | 'lastName'>;

    if (provider === SocialProvider.GOOGLE) {
      try {
        const client = new OAuth2Client(
          this.configService.authGoogleClientId,
          this.configService.authGoogleClientSecret,
          'postmessage',
        );

        const tokenInfo = await client.getTokenInfo(accessToken);

        if (!tokenInfo || !tokenInfo.email) {
          throw new UnauthorizedException(
            `Failed to get user info from ${provider}`,
          );
        }

        userInfo = {
          email: tokenInfo.email,
        };

        return userInfo;
      } catch (error) {
        throw new UnauthorizedException(
          `Failed to get user info from ${provider}`,
        );
      }
    }

    if (provider === SocialProvider.FACEBOOK) {
      try {
        const response = await lastValueFrom(
          this.httpService.get(
            `https://graph.facebook.com/${userId}?fields=first_name,last_name,email&access_token=${accessToken}`,
          ),
        );

        userInfo = {
          email: response.data.email,
          firstName: response.data.first_name,
          lastName: response.data.last_name,
        };

        return userInfo;
      } catch (error) {
        throw new UnauthorizedException(
          `Failed to get user info from ${provider}`,
        );
      }
    }
  }
}
