import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { DBAccessService } from 'src/db-access/db-access.service';

@Injectable()
export class OnlyGradeCreatorGuard implements CanActivate {
  constructor(private db: DBAccessService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      const userId = req.user.id;
      const gradeId = req.body.id;

      const { teacherId } = await this.db.performance.findUnique({
        where: { id: Number(gradeId) },
      });

      return this.db.profile
        .findUnique({ where: { id: teacherId } })
        .then((e) => e.userId == userId);
    } catch (_) {
      return false;
    }
  }
}
