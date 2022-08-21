import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { DBAccessService } from 'src/db-access/db-access.service';

@Injectable()
export class OnlyGradeCreatorGuard implements CanActivate {
  constructor(private db: DBAccessService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const operatorPID = req.body.operatorPID;
    const gradeId = req.body.gradeId;

    return this.db.performance
      .findUnique({
        where: { id: Number(gradeId) },
        select: { teacherId: true },
      })
      .then((e) => e.teacherId == Number(operatorPID))
      .catch(() => false);
  }
}
