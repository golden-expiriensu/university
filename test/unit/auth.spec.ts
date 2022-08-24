import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { AuthService } from 'src/auth/auth.service';
import { IncorrectLoginOrPassword } from 'src/auth/error';
import { DBAccessService } from 'src/db-access/db-access.service';
import { UserService } from 'src/user/user.service';

import { user } from '../helper';

describe('AuthService tests', () => {
  let service: AuthService;
  let db: DBAccessService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
    db = module.get<DBAccessService>(DBAccessService);
    const userService = module.get<UserService>(UserService);
    
    await db.clear();
    await userService.create({ ...user.alice });
  });

  describe('Signin', () => {
    it('1: Should fail to sigin with bad password', async () => {
      await expect(
        service.signin({ login: user.alice.name, password: 'bad' }),
      ).rejects.toThrowError(IncorrectLoginOrPassword);
    });

    it('2: Should fail to signin with bad login', async () => {
      await expect(
        service.signin({ login: 'bad', password: user.alice.password }),
      ).rejects.toThrowError(IncorrectLoginOrPassword);
    });

    it('3: Should success to signin with email', async () => {
      expect(
        await service.signin({
          login: user.alice.email,
          password: user.alice.password,
        }),
      ).toEqual(expect.any(String));
    });

    it('4: Should success to signin with name', async () => {
      expect(
        await service.signin({
          login: user.alice.name,
          password: user.alice.password,
        }),
      ).toEqual(expect.any(String));
    });

    it('5: Should success to signin with phone', async () => {
      expect(
        await service.signin({
          login: user.alice.phone,
          password: user.alice.password,
        }),
      ).toEqual(expect.any(String));
    });
  });
});
