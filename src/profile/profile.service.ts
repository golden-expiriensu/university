import { Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { DBAccessService } from 'src/db-access/db-access.service';

import { CreateProfileDto, EditProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(private db: DBAccessService) {}

  public async create(userId: number, dto: CreateProfileDto): Promise<number> {
    return (
      await this.db.profile.create({
        data: {
          userId,
          ...dto,
        },
      })
    ).id;
  }

  public async edit(dto: EditProfileDto): Promise<Profile> {
    const id = dto.operatorPID;
    delete dto.operatorPID;

    return await this.db.profile.update({
      where: { id },
      data: { ...dto },
    });
  }
}
