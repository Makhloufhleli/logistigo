import { UserRepository } from '@app/modules/user/user.repository';
import { USER_REPOSITORY } from '@app/modules/user/user.repository.interfaces';
import { UserService } from '@app/modules/user/user.service';
import { USER_SERVICE } from '@app/modules/user/user.service.interface';
import { Provider } from '@nestjs/common';

export const UserServiceProviders: Provider[] = [
  { provide: USER_SERVICE, useClass: UserService },
  { provide: USER_REPOSITORY, useClass: UserRepository },
];
