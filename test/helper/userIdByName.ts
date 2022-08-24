import { DBAccessService } from 'src/db-access/db-access.service';

export const userIdByName = async (db: DBAccessService, name: string) => {
  return (
    await db.user.findFirst({
      where: { name },
      select: { id: true },
    })
  ).id;
};
