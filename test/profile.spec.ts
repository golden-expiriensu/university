import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from 'src/app.module';
import { DBAccessService } from 'src/db-access/db-access.service';

const port = 3000;

describe('Profile module tests', () => {
  let app: INestApplication;
  let db: DBAccessService;

  const accessTokenKey = 'accessToken';
  const bearerAuth = (atk?: string) => {
    return { Authorization: `Bearer $S{${atk ?? accessTokenKey}}` };
  };
  const resBody = 'res.body';

  const uriPath = {
    create: '/profile/create',
    edit: '/profile/edit',
    signup: '/auth/signup',
  };

  const user = {
    email: 'alice00@example.com',
    name: 'Alice',
    phone: '+79998887766',
    password: '010100',
    dateOfBirth: new Date('2000-01-01'),
    sex: 'FEMALE',
  };

  const profileIdKey = 'profileId';
  const profile = {
    university: 'MIT',
    faculty: 'SI',
    group: 11,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.listen(port);
    await app.init();

    db = app.get(DBAccessService);
    await db.clear();

    pactum.request.setBaseUrl(`http://localhost:${port}`);

    await Promise.all([
      pactum
        .spec()
        .post(uriPath.signup)
        .withBody({ ...user })
        .stores(accessTokenKey, resBody)
        .expectStatus(HttpStatus.CREATED),
    ]);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Create', () => {
    it('1: User cannot create a profile without auth', async () => {
      return pactum
        .spec()
        .post(uriPath.create)
        .expectStatus(HttpStatus.UNAUTHORIZED);
    });

    it('2: User can create profile', async () => {
      return pactum
        .spec()
        .post(uriPath.create)
        .withBody({ ...profile })
        .withHeaders(bearerAuth())
        .expectStatus(HttpStatus.CREATED)
        .stores(profileIdKey, resBody);
    });
  });

  describe('Edit', () => {
    it('1: User cannot edit profile that is not his own', async () => {
      await Promise.all([
        pactum
          .spec()
          .post(uriPath.signup)
          .withBody({ email: 'malicious@example.com', password: '123' })
          .stores('maliciousAccessToken', resBody),
      ]);
      return pactum
        .spec()
        .patch(uriPath.edit)
        .withHeaders(bearerAuth('maliciousAccessToken'))
        .withBody({
          profileId: `$S{${profileIdKey}}`,
          university: 'Bad',
        })
        .expectStatus(HttpStatus.FORBIDDEN)
        .expectBodyContains('Not profile owner');
    });

    it('2: User cannot edit non existing profile', async () => {
      return pactum
        .spec()
        .patch(uriPath.edit)
        .withHeaders(bearerAuth())
        .withBody({
          profileId: -1,
          university: 'New',
        })
        .expectStatus(HttpStatus.FORBIDDEN)
        .expectBodyContains('Profile not found');
    });

    it('3: User can edit profile', async () => {
      return pactum
        .spec()
        .patch(uriPath.edit)
        .withHeaders(bearerAuth())
        .withBody({
          profileId: `$S{${profileIdKey}}`,
          university: 'New',
        })
        .expectStatus(HttpStatus.ACCEPTED);
    });
  });
});
