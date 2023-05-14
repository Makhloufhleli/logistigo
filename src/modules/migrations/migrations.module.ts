import { DatabaseModule } from '@app/modules/database/database.module';
import { MigrationsManager } from '@app/modules/migrations/migrations.manager';
import { MigrationsServiceProviders } from '@app/modules/migrations/migrations.providers';
import { Logger, Module } from '@nestjs/common';
const { Services } = MigrationsServiceProviders;
@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...Services, Logger, MigrationsManager],
})
export class MigrationsModule {}
