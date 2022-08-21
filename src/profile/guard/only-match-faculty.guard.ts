import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { DBAccessService } from 'src/db-access/db-access.service';

@Injectable()
export class OnlyMatchFacultyGuard implements CanActivate {
  constructor(private db: DBAccessService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const profileId = req.body.operatorPID;
    const faculty = req.body.faculty;
    const university = req.body.university;

    return this.db.profile
      .findUnique({
        where: { id: Number(profileId) },
        select: { faculty: true, university: true },
      })
      .then((e) => e.faculty === faculty && e.university === university)
      .catch(() => false);
  }
}
