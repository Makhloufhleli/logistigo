import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const OpenApiDocs = {
  AUTH: {
    LOGIN: {
      SUMMARY: 'Login a user (save a new session and returns access and refresh tokens)',
    },
    REGISTER: {
      SUMMARY: 'Save new user in the database',
    },
    LOGOUT: {
      SUMMARY: 'Expire refresh token and logout user',
    },
  },
};

export const swaggerConfig = {
  bearerAuthOptions: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    in: 'header',
  } as SecuritySchemeObject,
  TITLE: process.env.API_TITLE as string,
  DESCRIPTION: process.env.API_DESCRIPTION as string,
  VERSION: process.env.API_VERSION as string,
  BASE_PATH: 'api',
  runnerProfilePictureUploadOptions: {
    schema: {
      type: 'object',
      properties: {
        upload: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  },
};
