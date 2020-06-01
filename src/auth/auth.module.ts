import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ //TODO: Acho que pode tirar! Esse é pra criar o token
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
