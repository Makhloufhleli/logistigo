import { AppProviders } from '@app/app.providers';
import { environmentConstants } from '@app/constants/environment.constants';
import { AuthModule } from '@app/modules/auth/auth.module';
import { CompanyModule } from '@app/modules/company/company.module';
import { DatabaseModule } from '@app/modules/database/database.module';
import { UserModule } from '@app/modules/user/user.module';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';

const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIME_TO_LIVE,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  DEFAULT_FROM_EMAIL,
} = environmentConstants.environment;

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
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>(SMTP_HOST),
          port: Number(configService.get<string>(SMTP_PORT)),
          secure: false, // upgrade later with STARTTLS
          auth: {
            user: configService.get<string>(SMTP_USER),
            pass: configService.get<string>(SMTP_PASSWORD),
          },
        },
        defaults: {
          from: configService.get<string>(DEFAULT_FROM_EMAIL),
        },
        template: {
          dir: process.cwd() + '/templates/',
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
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
