import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { DBAccessService } from 'src/db-access/db-access.service';
import { ProfileService } from 'src/profile/profile.service';

import { mockDBAcceessService, profile, user } from '../helper';

describe('ProfileService tests', () => {
  let service: ProfileService;
  let db: DBAccessService;

  const userId = 1;
  let profileId: {
    teacher: number;
    student: number;
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DBAccessService)
      .useValue(mockDBAcceessService)
      .compile();

    service = module.get<ProfileService>(ProfileService);
    db = module.get<DBAccessService>(DBAccessService);
  });

  beforeEach(async () => {
    // @ts-ignore
    mockDBAcceessService.user.create.mockResolvedValue({
      id: userId,
      ...user.alice,
    });
  });

  it('1: Should successfully create profiles', async () => {
    // @ts-ignore
    mockDBAcceessService.profile.create.mockResolvedValueOnce({
      ...{ ...profile.teacher.u1f1 },
      id: 1,
      userId,
      group: null,
    });
    // @ts-ignore
    mockDBAcceessService.profile.create.mockResolvedValueOnce({
      ...{ ...profile.student.u1f1g1 },
      id: 2,
      userId,
    });

    const [t, s] = await Promise.all([
      service.create(userId, { ...profile.teacher.u1f1 }),
      service.create(userId, { ...profile.student.u1f1g1 }),
    ]);

    expect(t).toEqual(expect.objectContaining({ ...profile.teacher.u1f1 }));
    expect(s).toEqual(expect.objectContaining({ ...profile.student.u1f1g1 }));

    profileId = { teacher: t.id, student: s.id };
  });

  it('2: Should get correct data of profile', async () => {
    // @ts-ignore
    mockDBAcceessService.profile.findUnique.mockResolvedValueOnce({
      ...{ ...profile.teacher.u1f1 },
      id: 1,
      userId,
      group: null,
    });
    // @ts-ignore
    mockDBAcceessService.profile.findUnique.mockResolvedValueOnce({
      ...{ ...profile.student.u1f1g1 },
      id: 2,
      userId,
    });

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
    // @ts-ignore
    mockDBAcceessService.profile.update.mockResolvedValueOnce({
      ...{ ...profile.teacher.u2f1 },
      id: 1,
      userId,
      group: null,
    });
    expect(
      await service.edit({
        operatorPID: profileId.student,
        ...profile.teacher.u2f1,
      }),
    ).toEqual(expect.objectContaining({ ...profile.teacher.u2f1 }));
  });

  it('4: Should delete profile', async () => {
    // @ts-ignore
    mockDBAcceessService.profile.delete.mockResolvedValueOnce({
      ...{ ...profile.teacher.u1f1 },
      id: 1,
      userId,
      group: null,
    });
    expect(await service.delete(profileId.teacher)).toEqual(
      expect.objectContaining({ ...profile.teacher.u1f1 }),
    );
    expect(await db.profile.findUnique({ where: { id: profileId.teacher } }))
      .toBeNull;
  });
});
