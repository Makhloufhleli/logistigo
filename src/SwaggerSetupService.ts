import type { INestApplication } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { swaggerConfig } from '@app/constants/OpenApiDocs';

@Injectable()
export class SwaggerSetupService {
  public static async setup(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.TITLE)
      .setDescription(swaggerConfig.DESCRIPTION)
      .setVersion(swaggerConfig.VERSION)
      .addBearerAuth(swaggerConfig.bearerAuthOptions, 'JWT-auth')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  }
}
