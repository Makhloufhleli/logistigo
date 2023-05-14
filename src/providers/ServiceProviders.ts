import { AccessTokenGuard } from '@app/security/guards/AccessTokenGuard';
import { RolesGuard } from '@app/security/guards/RolesGuard';
import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

const servicesProviders: Array<Provider> = [
  { provide: APP_GUARD, useClass: AccessTokenGuard },
  { provide: APP_GUARD, useClass: RolesGuard },
];
const repositoriesProviders: Array<Provider> = [];

export const ServiceProviders = {
  Services: servicesProviders,
  Repositories: repositoriesProviders,
};
