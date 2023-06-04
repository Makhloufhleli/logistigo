import { AppModule } from '@app/app.module';
import { globalVariables } from '@app/common/global.variables';
import { environmentConstants } from '@app/constants/environment.constants';
import {
  BaseExceptionFilter,
  HttpExceptionFilter,
  ValidationExceptionFilter,
} from '@app/exceptions';
import { SwaggerSetupService } from '@app/swagger-setup';
import {
  ClassSerializerInterceptor,
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { useContainer } from 'class-validator';
class Application {
  constructor() {
    this.bootstrap();
  }
  async bootstrap() {
    const app = await NestFactory.create(AppModule);
    useContainer(app.select(AppModule), { fallbackOnErrors: true, fallback: true });
    app.setGlobalPrefix(globalVariables.api.globalPrefix);
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        stopAtFirstError: false,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        transform: true,
        dismissDefaultMessages: true,
        exceptionFactory: (errors) => new UnprocessableEntityException(errors),
      }),
    );
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.useGlobalFilters(
      new HttpExceptionFilter(app.get(ConfigService)),
      new BaseExceptionFilter(app.get(ConfigService)),
      new ValidationExceptionFilter(app.get(ConfigService)),
    );
    await SwaggerSetupService.setup(app);
    const configService = app.get(ConfigService);
    await app.listen(configService.get<number>('SERVER_PORT'));
    Logger.log(
      `Server listening in port:${configService.get<number>(
        environmentConstants.environment.SERVER_PORT,
      )}, navigate to  ${await app.getUrl()}/api-docs for Swagger docs`,
      Application.name,
    );
  }
}

new Application();
