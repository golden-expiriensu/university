import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IsNumberString } from 'class-validator';
import { DBAccessService } from 'src/db-access/db-access.service';

@Injectable()
export class OnlySameFacultyGuard implements CanActivate {
  constructor(private db: DBAccessService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const faculty = req.body.faculty;
    const userId = req.user.id;

    if (!faculty || !userId || !IsNumberString(userId)) return false;

    return this.db.profile
      .findFirst({ where: { userId: Number(userId), faculty } })
      .then((e) => !!e);
  }
}
