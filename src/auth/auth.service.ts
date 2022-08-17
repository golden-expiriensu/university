import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { DBAccessService } from 'src/db-access/db-access.service';

import { AuthDto } from './dto';
import { JwtStrategy } from './strategy';

@Injectable()
export class AuthService {
  constructor(private validation: JwtStrategy, private db: DBAccessService) {}

  async signin(dto: AuthDto) {
    const user = await this.db.user.findUnique({
      where: {
        ...dto.login,
      },
    });

    if (!user && (await argon.verify(user.password, dto.password)))
      throw new ForbiddenException('Incorrect login or password');

    return this.generateToken(user.id);
  }

  generateToken(userId: number) {
    const payload = {
      sub: userId,
    };
    return this.validation.sign(payload);
  }
}
