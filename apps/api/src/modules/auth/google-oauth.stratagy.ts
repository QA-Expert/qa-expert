import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Profile } from 'passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends Strategy {
  constructor(private readonly configService: ConfigService) {
    super(
      {
        clientID: configService.authGoogleClientId,
        clientSecret: configService.authGoogleClientSecret,
        callbackURL: configService.authGoogleCallbackUrl,
        scope: configService.authGoogleScope,
      },
      function verify(
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
      ) {
        console.log('Stratagy', profile, _accessToken, _refreshToken);

        if (!profile) {
          return done(new UnauthorizedException(), false);
        }

        done(null, profile);
      },
    );
  }
}
