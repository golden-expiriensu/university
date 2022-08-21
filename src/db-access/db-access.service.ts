import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class DBAccessService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  public async clear(): Promise<void> {
    if (process.env.DEVELOPMENT) {
      await this.$transaction([
        this.profile.deleteMany(),
        this.user.deleteMany(),
      ]);
    }
  }

  public static errorCodes = () => {
    return { duplicateField: 'P2002' };
  };

  public static isClientKnownRequestError = (error: Error) => {
    return error instanceof PrismaClientKnownRequestError;
  };
}
