import { AuthResponseDto } from '@app/modules/auth/dto/auth-response.dto';
import { LoginDto } from '@app/modules/auth/dto/login.dto';

export const AUTH_SERVICE = Symbol('AUTH_SERVICE');
export interface IAuthService {
  generatePassword(): Promise<string>;
  login(LoginDto: LoginDto): Promise<AuthResponseDto>;
  logout(userId: number, userAgent: string): Promise<boolean>;
  refresh(userId: number, userAgent: string, refreshToken: string): Promise<AuthResponseDto>;
}
