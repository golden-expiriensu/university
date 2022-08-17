import { ForbiddenException } from '@nestjs/common';

export class IncorrectLoginOrPassword extends ForbiddenException {
  constructor() {
    super('Incorrect login or password');
  }
}
