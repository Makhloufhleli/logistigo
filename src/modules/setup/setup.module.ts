import { EnvironmentSchema } from '@app/common/validations/EnvironmentValidationSchema';
import { SetupManager } from '@app/modules/setup/setup.manager';
import { SetupServiceProviders } from '@app/modules/setup/setup.providers';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
const { Services } = SetupServiceProviders;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvironmentSchema,
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [...Services, Logger, SetupManager],
})
export class SetupModule {}
