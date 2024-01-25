import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { UserInputLogin } from '../users/login-user.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserOutputLogin } from '../users/login-user.output';
import { ConfigService } from '../config/config.service';
import { UserBaseModel } from 'src/modules/users/user-base.model';
import { UserSocialProviderService } from '../user-social-provider/user-social-provider.service';
import { UserSocialProviderLoginInput } from '../user-social-provider/user-social-provider-login.input';
import { UserSocialProviderCreateInput } from '../user-social-provider/user-social-provider-create.input';

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

  async loginWithSocialProvider(data: UserSocialProviderLoginInput) {
    const useSocialProviderDoc =
      await this.userSocialProviderService.findOnByProviderAndSocialId({
        id: data.id,
        socialId: data.socialId,
      });

    const user = await this.usersService.findById(
      useSocialProviderDoc.user._id,
    );

    return await this.login(user);
  }

  async registerWithSocialProvider(data: UserSocialProviderCreateInput) {}
}
