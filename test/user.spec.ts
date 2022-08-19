import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from 'src/app.module';
import { DBAccessService } from 'src/db-access/db-access.service';

const port = 3000;

describe('User module tests', () => {
  let app: INestApplication;
  let db: DBAccessService;

  const accessTokenKey = "accessToken";
  const bearerAuth = { Authorization: `Bearer $S{${accessTokenKey}}` };
  const resBody = 'res.body';

  const uriPath = {
    create: '/user/create',
    edit: '/user/edit'
  }

  const user = {
    email: 'alice00@example.com',
    name: 'Alice',
    phone: '+79998887766',
    password: '010100',
    dateOfBirth: new Date('2000-01-01'),
    sex: 'FEMALE',
  };

  const editedUser = (() => {
    const userCopy = { ...user };
    userCopy.name = 'newAlice';
    userCopy.phone = '+78889996677';
    return userCopy;
  })();

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
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Create', () => {
    it('1: Should forbid to create user with no email', async () => {
      return pactum
        .spec()
        .post(uriPath.create)
        .withBody({ password: user.password })
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('2: Should forbid to create user with no password', async () => {
      return pactum
        .spec()
        .post(uriPath.create)
        .withBody({ email: user.email })
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('3: Should allow to create user', async () => {
      return pactum
        .spec()
        .post(uriPath.create)
        .withBody({ ...user })
        .expectStatus(HttpStatus.CREATED)
        .stores(accessTokenKey, resBody);
    });

    it('4: Should forbid to create user with duplicate email', async () => {
      return pactum
        .spec()
        .post(uriPath.create)
        .withBody({ email: user.email, password: user.password })
        .expectStatus(HttpStatus.FORBIDDEN);
    });

    it('5: Should forbid to create user with duplicate name', async () => {
      return pactum
        .spec()
        .post(uriPath.create)
        .withBody({
          email: 'unique@email.com',
          name: user.name,
          password: user.password,
        })
        .expectStatus(HttpStatus.FORBIDDEN);
    });

    it('6: Should forbid to create user with duplicate phone', async () => {
      return pactum
        .spec()
        .post(uriPath.create)
        .withBody({
          email: 'unique@email.com',
          phone: user.phone,
          password: user.password,
        })
        .expectStatus(HttpStatus.FORBIDDEN);
    });
  });

  describe('Edit', () => {
    it('1: Shoul forbid to edit without authorization', async () => {
      return pactum
        .spec()
        .patch(uriPath.edit)
        .expectStatus(HttpStatus.UNAUTHORIZED);
    });

    it('2: Should forbid to edit if unique field already occupied', async () => {
      const occupiedPhone = '+78887776655';
      const occupiedName = 'coolName';

      await Promise.all([
        pactum
          .spec()
          .post(uriPath.create)
          .withBody({
            email: 'email@example.com',
            phone: occupiedPhone,
            name: occupiedName,
            password: '123',
          })
          .expectStatus(HttpStatus.CREATED),
      ]);

      return Promise.all([
        pactum
          .spec()
          .patch(uriPath.edit)
          .withBody({
            phone: occupiedPhone,
          })
          .withHeaders(bearerAuth)
          .expectStatus(HttpStatus.FORBIDDEN),
        pactum
          .spec()
          .patch(uriPath.edit)
          .withBody({
            name: occupiedName,
          })
          .withHeaders(bearerAuth)
          .expectStatus(HttpStatus.FORBIDDEN),
      ]);
    });

    it('3: Should allow to edit user', async () => {
      return pactum
        .spec()
        .patch(uriPath.edit)
        .withBody({
          ...editedUser,
        })
        .withHeaders(bearerAuth)
        .expectStatus(HttpStatus.ACCEPTED);
    });
  });

  describe('Get me', () => {
    const meUriPostfix = '/user/me';

    it('1: Should forbid to get me without authorization', async () => {
      return pactum
        .spec()
        .get(meUriPostfix)
        .expectStatus(HttpStatus.UNAUTHORIZED);
    });

    it('2: Should allow to get me', async () => {
      return pactum
        .spec()
        .get(meUriPostfix)
        .withHeaders(bearerAuth)
        .expectStatus(HttpStatus.OK)
        .expectBodyContains(editedUser.email)
        .expectBodyContains(editedUser.name)
        .expectBodyContains(editedUser.phone)
        .expectBodyContains(editedUser.dateOfBirth)
        .expectBodyContains(editedUser.sex);
    });
  });
});
