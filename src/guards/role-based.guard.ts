import { ROLES_KEY } from '@app/decorators/authorize-with-roles.decorator';
import { UserRoles } from '@app/enums';
import { IUserRepository, USER_REPOSITORY } from '@app/modules/user/user.repository.interfaces';
import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger: Logger = new Logger(RolesGuard.name);
  constructor(
    private reflector: Reflector,
    @Inject(USER_REPOSITORY)
    private userRepository: IUserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }
      const { user } = context.switchToHttp().getRequest();
      const userToAuthorize = await this.userRepository.getUserById(user.sub);
      return requiredRoles.some((role) => userToAuthorize.role === role);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
