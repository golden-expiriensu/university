import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IsNumberString } from 'class-validator';
import { Observable } from 'rxjs';
import { DBAccessService } from 'src/db-access/db-access.service';

@Injectable()
export class OnlyProfileOwnerGuard implements CanActivate {
  constructor(private db: DBAccessService) {}

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const profileId = req.body.profileId;
    const userId = req.user.id;

    if (
      !profileId ||
      !IsNumberString(profileId) ||
      !userId ||
      !IsNumberString(userId)
    )
      return false;

    return this.db.profile
      .findUnique({
        where: { id: Number(profileId) },
        select: { userId: true },
      })
      .then((e) => e.userId == userId);
  }
}
