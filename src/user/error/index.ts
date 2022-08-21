import { ForbiddenException } from '@nestjs/common';

export class LoginIsOccupied extends ForbiddenException {
  constructor() {
    super('Token occupied');
  }
}
