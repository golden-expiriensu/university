import { Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { DBAccessService } from 'src/db-access/db-access.service';

import { CreateProfileDto, EditProfileDto } from './dto';
import { NotProfileOwnerException, ProfileNotFoundException } from './error';

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

  public async edit(userId: number, dto: EditProfileDto): Promise<Profile> {
    const user = await this.db.profile.findUnique({
      where: { id: dto.profileId },
      select: { userId: true },
    });
    if (!user) throw new ProfileNotFoundException();
    if (user.userId !== userId) throw new NotProfileOwnerException();

    const id = dto.profileId;
    delete dto.profileId;

    return await this.db.profile.update({
      where: { id },
      data: { ...dto },
    });
  }
}
