import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // delegates the responsibility of ensuring that a JWT has not expired to the Passport module
      secretOrKey: process.env.AUTH_SECRET,
    });
  }

  async validate(payload: any) {
    console.log('PAYLOAD --------', payload);

    return payload;
  }
}
