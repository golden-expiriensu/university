import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { DBAccessService } from 'src/db-access/db-access.service';
import { ProfileService } from 'src/profile/profile.service';
import { UserService } from 'src/user/user.service';
import { userIdByName as findUserIdByHisName } from 'test/helper/userIdByName';

import { profile, user } from '../helper';

describe('ProfileService tests', () => {
  let service: ProfileService;
  let db: DBAccessService;

  let profileId: {
    teacher: number;
    student: number;
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    const userService = module.get<UserService>(UserService);
    db = module.get<DBAccessService>(DBAccessService);

    await db.clear();
    await userService.create({ ...user.alice });
  });

  it('1: Should successfully create profiles', async () => {
    const userId = await findUserIdByHisName(db, user.alice.name);
    const [t, s] = await Promise.all([
      service.create(userId, { ...profile.teacher.u1f1 }),
      service.create(userId, { ...profile.student.u1f1g1 }),
    ]);

    expect(t).toEqual(expect.objectContaining({ ...profile.teacher.u1f1 }));
    expect(s).toEqual(expect.objectContaining({ ...profile.student.u1f1g1 }));

    profileId = { teacher: t.id, student: s.id };
  });

  it('2: Should get correct data of profile', async () => {
    expect(await service.get(profileId.teacher)).toEqual(
      expect.objectContaining({
        ...profile.teacher.u1f1,
      }),
    );
    expect(await service.get(profileId.student)).toEqual(
      expect.objectContaining({
        ...profile.student.u1f1g1,
      }),
    );
  });

  it('3: Should update profile', async () => {
    expect(
      await service.edit({
        operatorPID: profileId.student,
        ...profile.teacher.u2f1,
      }),
    ).toEqual(expect.objectContaining({ ...profile.teacher.u2f1 }));
  });

  it('4: Should delete profile', async () => {
    expect(await service.delete(profileId.teacher)).toEqual(
      expect.objectContaining({ ...profile.teacher.u1f1 }),
    );
    expect(await db.profile.findUnique({ where: { id: profileId.teacher } }))
      .toBeNull;
  });
});
