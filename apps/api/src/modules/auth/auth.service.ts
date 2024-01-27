import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { UserInputLogin } from '../users/login-user.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserOutputLogin } from '../users/login-user.output';
import { ConfigService } from '../config/config.service';
import { UserBaseModel } from 'src/modules/users/user-base.model';
import { UserSocialProviderService } from '../user-social-provider/user-social-provider.service';
import { SocialAuthInput, SocialProvider } from './social-auth.input';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userSocialProviderService: UserSocialProviderService,
  ) {}

  async validateUserAndLogin(
    data: UserInputLogin,
  ): Promise<UserOutputLogin | null> {
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

  async login(user: UserBaseModel): Promise<UserOutputLogin> {
    return {
      ...user,
      access_token: await this.jwtService.signAsync(
        { ...user },
        {
          secret: this.configService.authSecret,
          expiresIn: this.configService.authTokenExpiresIn,
        },
      ),
    };
  }

  async loginSocial(data: SocialAuthInput) {
    const oAuth2Client = new OAuth2Client(
      this.configService.authGoogleClientId,
      this.configService.authGoogleClientSecret,
      'postmessage',
    );

    try {
      if (data.provider === SocialProvider.GOOGLE) {
        const user = await oAuth2Client.getTokenInfo(data.accessToken);

        console.log('USER', user);
      }
    } catch (error) {
      console.log('ERROR', error);
    }

    // const useSocialProviderDoc =
    //   await this.userSocialProviderService.findOnByProviderAndSocialId({
    //     id: data.id,
    //     socialId: data.socialId,
    //   });

    // const user = await this.usersService.findById(
    //   useSocialProviderDoc.user._id,
    // );

    // return await this.login(user);
  }
}
