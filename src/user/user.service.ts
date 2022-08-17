import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { AuthService } from 'src/auth/auth.service';
import { DBAccessService } from 'src/db-access/db-access.service';

import { CreateUserDto, EditUserDto } from './dto';
import { LoginIsOccupied } from './error';

@Injectable()
export class UserService {
  constructor(private db: DBAccessService, private authService: AuthService) {}

  public async create(dto: CreateUserDto): Promise<string> {
    try {
      dto.password = await argon.hash(dto.password);
      const { id } = await this.db.user.create({
        data: { ...dto },
      });

      return this.authService.generateAccessToken(id);
    } catch (error) {
      if (
        DBAccessService.isClientKnownRequestError(error) &&
        DBAccessService.errorCodes().duplicateField === error.code
      ) {
        throw new LoginIsOccupied();
      } else {
        throw error;
      }
    }
  }

  // TODO: check how unique fields will be handled in case it already occupied (maybe need to add try catch)
  public async edit(id: number, dto: EditUserDto): Promise<void> {
    await this.db.user.update({
      where: { id },
      data: { ...dto },
    });
  }
}
