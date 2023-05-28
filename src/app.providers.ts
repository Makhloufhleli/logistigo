import { AccessTokenGuard } from '@app/guards/access-token.guard';
import { RefreshTokenGuard } from '@app/guards/refresh-token.guard';
import { RolesGuard } from '@app/guards/role-based.guard';
import { AccessTokenStrategy } from '@app/strategies/access-token.strategy';
import { RefreshTokenStrategy } from '@app/strategies/refresh-token.strategy';
import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

export const AppProviders: Array<Provider> = [
  { provide: APP_GUARD, useClass: AccessTokenGuard },
  { provide: APP_GUARD, useClass: RolesGuard },
  RefreshTokenGuard,
  AccessTokenStrategy,
  RefreshTokenStrategy,
];
