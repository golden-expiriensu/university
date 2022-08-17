import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { isEmail, isPhoneNumber } from 'class-validator';
import { DBAccessService } from 'src/db-access/db-access.service';

import { AuthDto } from './dto';
import { IncorrectLoginOrPassword } from './error';

@Injectable()
export class AuthService {
  constructor(private db: DBAccessService, private jwt: JwtService) {}

  public generateAccessToken(userId: number): Promise<string> {
    const payload = {
      sub: userId,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET,
    });
  }

  public async signin(dto: AuthDto): Promise<string> {
    const user = await this.db.user.findUnique({
      where: {
        ...this.parseLogin(dto.login),
      },
    });

    if (!user || !(await argon.verify(user.password, dto.password)))
      throw new IncorrectLoginOrPassword();

    return this.generateAccessToken(user.id);
  }

  private parseLogin(
    login: string,
  ): { name: string } | { email: string } | { phone: string } {
    if (isEmail(login)) return { email: login };
    else if (isPhoneNumber(login)) return { phone: login };
    else return { name: login };
  }
}
