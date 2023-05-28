import { AuthResponseDto } from '@app/modules/auth/dto/auth-response.dto';
import { Tokens } from '@app/shared/jwt/jwt.tokens';

export const JWT_SERVICE = Symbol('JWT_SERVICE');
export interface IJwtService {
  signTokens(userId: number, email: string): Promise<Tokens>;
  refreshTokens(userId: number, userAgent: string, refreshToken: string): Promise<AuthResponseDto>;
}
