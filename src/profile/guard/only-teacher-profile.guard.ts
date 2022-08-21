import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DBAccessService } from 'src/db-access/db-access.service';

@Injectable()
export class OnlyTeacherProfileGuard implements CanActivate {
  constructor(private db: DBAccessService) {}

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const teacherId = req.body.operatorPID;

    return this.db.profile
      .findUnique({
        where: { id: Number(teacherId) },
        select: { group: true },
      })
      .then((e) => !e.group)
      .catch(() => false);
  }
}
