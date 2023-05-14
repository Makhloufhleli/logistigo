import { SetupService } from '@app/modules/setup/setup.service';
import { SETUP_SERVICE } from '@app/modules/setup/setup.service.interface';
import { Provider } from '@nestjs/common';

const servicesProviders: Array<Provider> = [{ provide: SETUP_SERVICE, useClass: SetupService }];

export const SetupServiceProviders = {
  Services: servicesProviders,
};
