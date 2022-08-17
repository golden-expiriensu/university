import { Global, Module } from '@nestjs/common';

import { DBAccessService } from './db-access.service';

@Global()
@Module({
  providers: [DBAccessService],
  exports: [DBAccessService],
})
export class DBAccessModule {}
