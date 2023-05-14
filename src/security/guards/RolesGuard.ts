import { ROLES_KEY } from '@app/decorators/AuthorizeWithRoles';
import { UserRoles } from '@app/enums';
import { IUserService, USERS_SERVICE } from '@app/modules/user/user.service.interface';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(USERS_SERVICE)
    private userService: IUserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const userToAuthorize = await this.userService.getUserById(user.sub);
    return requiredRoles.some((role) => userToAuthorize.role?.includes(role));
  }
}
