import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`, //CorrectOne for PROD
        jwksUri: 'https://admin.rac.dev.totvs.io/totvs.rac/.well-known/openid-configuration/jwks', //RAC OAuth HardCoded
      }),
    });
  }

  async validate(payload: any) { //Does something with request payload before it goes to controller
    // I want the controller to know the tenantId from request (JWT claim)
    // TODO: É AQUI QUE PEGA O TENANT RAPAZEADA
    return { userId: payload.sub, username: payload.username };
  }
}
