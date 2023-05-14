import { ReceiverService } from '@app/modules/receiver/receiver.service';
import { RECEIVER_SERVICE } from '@app/modules/receiver/receiver.service.interface';
import { Provider } from '@nestjs/common';

const servicesProviders: Array<Provider> = [
  { provide: RECEIVER_SERVICE, useClass: ReceiverService },
];

export const ReceiverServiceProviders = {
  Services: servicesProviders,
};
