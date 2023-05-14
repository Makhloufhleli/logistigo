import { ReceiverServiceProviders } from '@app/modules/receiver/receiver.providers';
import { Logger, Module } from '@nestjs/common';
const { Services } = ReceiverServiceProviders;
@Module({
  imports: [],
  controllers: [],
  providers: [...Services, Logger],
  exports: [...Services],
})
export class ReceiverModule {}
