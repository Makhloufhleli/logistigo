import { environmentConstants } from '@app/constants/environment.constants';
import { DatabaseModule } from '@app/modules/database/database.module';
import { UserModule } from '@app/modules/user/user.module';
import { ServiceProviders } from '@app/providers/ServiceProviders';
import { Guards } from '@app/security/guards';
import { Strategies } from '@app/security/strategies';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

const { Services, Repositories } = ServiceProviders;
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_TIME_TO_LIVE } = environmentConstants.environment;

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ACCESS_TOKEN_SECRET),
        signOptions: { expiresIn: configService.get<number>(ACCESS_TOKEN_TIME_TO_LIVE) },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [...Services, ...Repositories, ...Strategies, ...Guards],
})
export class AppModule {}
