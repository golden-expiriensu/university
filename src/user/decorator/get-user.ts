import { ExecutionContext } from '@nestjs/common';

export const getUser = (ctx: ExecutionContext, data?: string) => {
  const request = ctx.switchToHttp().getRequest();
  if (!!data) return request.user[data];
  return request.user;
};
