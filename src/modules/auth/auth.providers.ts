import { AuthService } from '@app/modules/auth/auth.service';
import { AUTH_SERVICE } from '@app/modules/auth/auth.service.interface';
import { Provider } from '@nestjs/common';
export const AuthProviders: Provider[] = [{ provide: AUTH_SERVICE, useClass: AuthService }];
