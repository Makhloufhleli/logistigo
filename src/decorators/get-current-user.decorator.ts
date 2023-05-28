import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { JwtPayload } from '../shared/jwt/jwt.payload';

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext) => {
    const logger: Logger = new Logger(GetCurrentUser.name);
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    logger.debug(`GetCurrentUser: ${JSON.stringify(request.user[data])}`);
    return request.user[data];
  },
);
