import { AccessTokenGuard } from '../../security/guards/AccessTokenGuard';
import { RefreshTokenGuard } from '../../security/guards/RefreshTokenGuard';

export const Guards = [AccessTokenGuard, RefreshTokenGuard];
