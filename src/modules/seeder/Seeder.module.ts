import { DatabaseModule } from '@app/modules/database/database.module';
import { ReceiverModule } from '@app/modules/receiver/receiver.module';
import { SeederManager } from '@app/modules/seeder/seeder.manager';
import { SeederServiceProviders } from '@app/modules/seeder/seeder.providers';
import { UserModule } from '@app/modules/user/user.module';
import { Module } from '@nestjs/common';
const { Services } = SeederServiceProviders;

@Module({
  imports: [DatabaseModule, UserModule, ReceiverModule],
  controllers: [],
  providers: [...Services, SeederManager],
  exports: [],
})
export class SeederModule {}
