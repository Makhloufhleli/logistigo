import type { INestApplication } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { globalVariables } from '@app/common/global.variables';
import { swaggerConfig } from '@app/constants/OpenApiDocs';

@Injectable()
export class SwaggerSetupService {
  public static async setup(app: INestApplication) {
    const options = new DocumentBuilder()
      .setBasePath(globalVariables.api.globalPrefix)
      .setTitle(swaggerConfig.TITLE)
      .setDescription(swaggerConfig.DESCRIPTION)
      .setVersion(swaggerConfig.VERSION)
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          in: 'header',
        },
        'JWT-auth',
      )
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }
}
