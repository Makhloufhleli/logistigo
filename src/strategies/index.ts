import { AccessTokenStrategy } from '@app/security/strategies/AccessTokenStrategy';

export * from './AccessTokenStrategy';
export * from './snake-naming.strategy';

export const AppStrategies = [AccessTokenStrategy];
