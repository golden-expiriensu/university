import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DBAccessService } from 'src/db-access/db-access.service';
import { getUser } from 'src/user/decorator';

@Injectable()
export class OnlyProfileOwnerGuard implements CanActivate {
  constructor(private db: DBAccessService) {}

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const profileId = req.body.operatorPID;

    return this.db.profile
      .findUnique({
        where: { id: Number(profileId) },
        select: { userId: true },
      })
      .then((e) => e.userId == Number(getUser(context).id))
      .catch(() => false);
  }
}
