import { ForbiddenException } from '@nestjs/common';

export class LoginIsOccupied extends ForbiddenException {
  constructor() {
    super('Login is occupied');
  }
}
