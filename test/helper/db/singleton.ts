import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';

import prisma from './client';

jest.mock('./client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

export const mockDBAcceessService = {
  user: prismaMock.user,
  errorCodes: () => {
    return { duplicateField: 'P2002' };
  },
  isClientKnownRequestError: (error: Error) => {
    return error instanceof PrismaClientKnownRequestError;
  },
};
