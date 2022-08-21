import { Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { DBAccessService } from 'src/db-access/db-access.service';

import { CreateProfileDto, EditProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(private db: DBAccessService) {}

  public create(userId: number, dto: CreateProfileDto): Promise<Profile> {
    return this.db.profile.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  public get(profileId: number): Promise<Profile> {
    return this.db.profile.findUnique({ where: { id: profileId } });
  }

  public edit(dto: EditProfileDto): Promise<Profile> {
    const id = dto.operatorPID;
    delete dto.operatorPID;

    return this.db.profile.update({
      where: { id },
      data: { ...dto },
    });
  }

  public delete(profileId: number): Promise<Profile> {
    return this.db.profile.delete({ where: { id: profileId } });
  }
}
