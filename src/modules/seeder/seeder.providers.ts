import { SeederService } from '@app/modules/seeder/seeder.services';
import { SEEDER_SERVICE } from '@app/modules/seeder/seeder.services.interfaces';
import { Provider } from '@nestjs/common';

const servicesProviders: Array<Provider> = [{ provide: SEEDER_SERVICE, useClass: SeederService }];

export const SeederServiceProviders = {
  Services: servicesProviders,
};
