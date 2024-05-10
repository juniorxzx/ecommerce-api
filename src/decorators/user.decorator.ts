import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const User = createParamDecorator(
  (_: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (request.user) {
      return request.user;
    } else {
      throw new NotFoundException('user not found');
    }
  },
);
