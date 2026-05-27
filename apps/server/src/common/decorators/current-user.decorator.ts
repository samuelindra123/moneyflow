import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as Express.User | undefined;

    if (data && user) {
      return (user as unknown as Record<string, unknown>)[data];
    }

    return user;
  },
);
