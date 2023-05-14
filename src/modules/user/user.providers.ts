import { UserRepository } from '@app/modules/user/user.repository';
import { USER_REPOSITORY } from '@app/modules/user/user.repository.interfaces';
import { UserService } from '@app/modules/user/user.service';
import { USERS_SERVICE } from '@app/modules/user/user.service.interface';
import { Provider } from '@nestjs/common';

const servicesProviders: Array<Provider> = [{ provide: USERS_SERVICE, useClass: UserService }];

const repositoryProviders: Array<Provider> = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
];

export const UserServiceProviders = {
  Services: servicesProviders,
  Repositories: repositoryProviders,
};
