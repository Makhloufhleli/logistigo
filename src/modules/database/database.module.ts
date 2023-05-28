import { EnvironmentSchema } from '@app/common/validations/EnvironmentValidationSchema';
import { environmentConstants } from '@app/constants/environment.constants';
import { entities } from '@app/entities';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = environmentConstants.environment;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvironmentSchema,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(DB_HOST),
        port: parseInt(configService.get<string>(DB_PORT)),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_NAME),
        synchronize: false,
        autoLoadEntities: true,
        entities: entities,
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule, ConfigModule],
})
export class DatabaseModule {}
