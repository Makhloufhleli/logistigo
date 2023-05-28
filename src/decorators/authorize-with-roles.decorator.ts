import { UserRoles } from '@app/enums';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const AuthorizeWithRoles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);
