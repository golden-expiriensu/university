import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { DBAccessService } from 'src/db-access/db-access.service';

@Injectable()
export class OnlySameFacultyGuard implements CanActivate {
  constructor(private db: DBAccessService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      const operatorPID = Number(req.body.operatorPID);
      const targetPID = Number(req.body.targetPID);

      const operator = await this.db.profile.findUnique({
        where: { id: operatorPID },
        select: { faculty: true, university: true },
      });
      const target = await this.db.profile.findUnique({
        where: { id: targetPID },
        select: { faculty: true, university: true },
      });
      return (
        operator.faculty === target.faculty &&
        operator.university === target.university
      );
    } catch (_) {
      return false;
    }
  }
}
