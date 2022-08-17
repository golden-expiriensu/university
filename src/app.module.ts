import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DBAccessModule } from './db-access/db-access.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    DBAccessModule,
  ],
})
export class AppModule {}
