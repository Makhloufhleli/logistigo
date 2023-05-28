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
  DESCRIPTION: `### REST

  Routes is following REST standard (Richardson level 3)
  
  <details><summary>Detailed specification</summary>
  <p>
  
  **List:**
    - \`GET /<resources>/\`
      - Get the list of **<resources>** as admin
    - \`GET /user/<user_id>/<resources>/\`
      - Get the list of **<resources>** for a given **<user_id>**
      - Output a **403** if logged user is not **<user_id>**
  
  **Detail:**
    - \`GET /<resources>/<resource_id>\`
      - Get the detail for **<resources>** of id **<resource_id>**
      - Output a **404** if not found
    - \`GET /user/<user_id>/<resources>/<resource_id>\`
      - Get the list of **<resources>** for a given **user_id**
      - Output a **404** if not found
      - Output a **403** if:
        - Logged user is not **<user_id>**
        - The **<user_id>** have no access to **<resource_id>**
  
  **Creation / Edition / Replacement / Suppression:**
    - \`<METHOD>\` is:
      - **POST** for creation
      - **PATCH** for update (one or more fields)
      - **PUT** for replacement (all fields, not used)
      - **DELETE** for suppression (all fields, not used)
    - \`<METHOD> /<resources>/<resource_id>\`
      - Create **<resources>** with id **<resource_id>** as admin
      - Output a **400** if **<resource_id>** conflicts with existing **<resources>**
    - \`<METHOD> /user/<user_id>/<resources>/<resource_id>\`
      - Create **<resources>** with id **<resource_id>** as a given **user_id**
      - Output a **409** if **<resource_id>** conflicts with existing **<resources>**
      - Output a **403** if:
        - Logged user is not **<user_id>**
        - The **<user_id>** have no access to **<resource_id>**
  </p>
  </details>`,
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
