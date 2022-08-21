import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { getUser } from '.';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => getUser(ctx, data),
);
