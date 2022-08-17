import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { DBAccessModule } from './db-access/db-access.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    DBAccessModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
