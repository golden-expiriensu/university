import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { DBAccessService } from 'src/db-access/db-access.service';

@Injectable()
export class OnlyMatchFacultyGuard implements CanActivate {
  constructor(private db: DBAccessService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const userId = req.user.id;
    const faculty = req.body.faculty;
    const university = req.body.university;

    return this.db.profile
      .findFirst({ where: { userId: Number(userId), faculty, university } })
      .then((e) => !!e)
      .catch(() => false);
  }
}
