import { AppProviders } from '@app/app.providers';
import { environmentConstants } from '@app/constants/environment.constants';
import { AuthModule } from '@app/modules/auth/auth.module';
import { CompanyModule } from '@app/modules/company/company.module';
import { DatabaseModule } from '@app/modules/database/database.module';
import { UserModule } from '@app/modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_TIME_TO_LIVE } = environmentConstants.environment;

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ACCESS_TOKEN_SECRET),
        signOptions: { expiresIn: configService.get<string>(ACCESS_TOKEN_TIME_TO_LIVE) },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver],
      typesOutputPath: path.join(__dirname, '../src/generated/i18n.generated.ts'),
    }),
    DatabaseModule,
    UserModule,
    CompanyModule,
    AuthModule,
  ],
  controllers: [],
  providers: [...AppProviders],
})
export class AppModule {}
