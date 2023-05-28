import { JwtServiceImpl } from '@app/modules/jwt/jwt.servic';
import { JWT_SERVICE } from '@app/modules/jwt/jwt.service.interface.ts';
import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export const JwtProviders: Provider[] = [
  { provide: JWT_SERVICE, useClass: JwtServiceImpl },
  JwtService,
];
