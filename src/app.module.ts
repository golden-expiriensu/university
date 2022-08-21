import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { DBAccessModule } from './db-access/db-access.module';
import { PerformanceModule } from './performance/performance.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    DBAccessModule,
    AuthModule,
    UserModule,
    ProfileModule,
    PerformanceModule,
  ],
})
export class AppModule {}
