import { PassportStrategy } from '@nestjs/passport';

import { JwtStrategy } from '../strategy';

export class AuthGuard extends PassportStrategy(JwtStrategy, 'jwt-strategy') {}
