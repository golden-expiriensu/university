import { ForbiddenException } from '@nestjs/common';

export class ProfileNotFoundException extends ForbiddenException {
  constructor() {
    super('Profile not found');
  }
}

export class NotProfileOwnerException extends ForbiddenException {
  constructor() {
    super('Not profile owner');
  }
}
