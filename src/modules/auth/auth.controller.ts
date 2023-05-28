import { GetCurrentUserId } from '@app/decorators/get-current-user-id.decorator';
import { GetCurrentUser } from '@app/decorators/get-current-user.decorator';
import { LoginApiDocs, LogoutApiDocs, RefreshApiDocs } from '@app/modules/auth/auth.openapi';
import { AUTH_SERVICE, IAuthService } from '@app/modules/auth/auth.service.interface';
import { AuthResponseDto } from '@app/modules/auth/dto/auth-response.dto';
import { LoginDto } from '@app/modules/auth/dto/login.dto';
import { Body, Controller, Inject, Ip, Req } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authService: IAuthService,
  ) {}

  @LoginApiDocs()
  async login(
    @Req() request,
    @Ip() ip: string,
    @Body() LoginDto: LoginDto,
  ): Promise<AuthResponseDto> {
    return await this.authService.login({
      ...LoginDto,
      values: {
        ipAddress: ip,
        userAgent: request.headers['user-agent'],
      },
    });
  }

  @RefreshApiDocs()
  async refreshTokens(
    @Req() request: Request,
    @GetCurrentUserId() userId: number,
    @GetCurrentUser() refreshToken: string,
  ): Promise<AuthResponseDto> {
    return await this.authService.refresh(userId, request.headers['user-agent'], refreshToken);
  }

  @LogoutApiDocs()
  async logout(@Req() request: Request, @GetCurrentUserId() userId: number) {
    return await this.authService.logout(userId, request.headers['user-agent']);
  }
}
