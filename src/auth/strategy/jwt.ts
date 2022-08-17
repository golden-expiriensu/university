import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DBAccessService } from 'src/db-access/db-access.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-strategy') {
  constructor(private jwt: JwtService, private db: DBAccessService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: number }) {
    const user = await this.db.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    delete user.password;
    return user;
  }

  async sign(payload: { sub: number }): Promise<string> {
    return await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET,
    });
  }
}
