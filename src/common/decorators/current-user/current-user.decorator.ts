import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../../schemas/user.schema';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserDocument => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
