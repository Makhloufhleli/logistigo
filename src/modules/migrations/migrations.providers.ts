import { MigrationsService } from '@app/modules/migrations/migrations.services';
import { MIGRATIONS_SERVICE } from '@app/modules/migrations/migrations.services.interfaces';
import { Provider } from '@nestjs/common';

const servicesProviders: Array<Provider> = [
  { provide: MIGRATIONS_SERVICE, useClass: MigrationsService },
];

export const MigrationsServiceProviders = {
  Services: servicesProviders,
};
