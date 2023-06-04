import { environmentConstants } from '@app/constants/environment.constants';
import { AuthResponseDto } from '@app/modules/auth/dto/auth-response.dto';
import { IJwtService } from '@app/modules/jwt/jwt.service.interface.ts';
import { ISessionService, SESSION_SERVICE } from '@app/modules/session/session.service.interface';
import { IUserService, USER_SERVICE } from '@app/modules/user/user.service.interface';
import { JwtPayload } from '@app/shared/jwt/jwt.payload';
import { Tokens } from '@app/shared/jwt/jwt.tokens';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtServiceImpl implements IJwtService {
  constructor(
    @Inject(USER_SERVICE) private userService: IUserService,
    @Inject(SESSION_SERVICE) private sessionService: ISessionService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>(
          environmentConstants.environment.ACCESS_TOKEN_SECRET,
        ),
        expiresIn: this.configService.get<string>(
          environmentConstants.environment.ACCESS_TOKEN_TIME_TO_LIVE,
        ),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>(
          environmentConstants.environment.REFRESH_TOKEN_SECRET,
        ),
        expiresIn: this.configService.get<string>(
          environmentConstants.environment.REFRESH_TOKEN_TIME_TO_LIVE,
        ),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
      accessTokenExpiresIn: this.jwtService.decode(accessToken)['exp'],
      refreshTokenExpiresIn: this.jwtService.decode(refreshToken)['exp'],
    };
  }

  async refreshTokens(
    userId: number,
    userAgent: string,
    refreshToken: string,
  ): Promise<AuthResponseDto> {
    // Check if the user exists by the given id
    const isRegistered = await this.userService.isIdExists(userId);
    if (!isRegistered) {
      throw new UnauthorizedException('Unauthorized');
    }
    // Check if the user have a valid session(session not expired and token not null)
    if (!(await this.sessionService.isValidSession(userId, userAgent))) {
      throw new UnauthorizedException('Token expired or invalid');
    }
    // Get session to update token
    const session = await this.sessionService.getSessionByUserIdAndUserAgent(userId, userAgent);
    // Check if the sent token is the same as the saved token with the session
    const tokensMatches = await bcrypt.compare(refreshToken, session.token);
    if (!tokensMatches) {
      throw new UnauthorizedException('Invalid token');
    }

    if ((await this.jwtService.decode(refreshToken)['exp']) < Date.now() / 1000) {
      await this.sessionService.expireSession(session.id);
      throw new UnauthorizedException('Session expired');
    }

    // Generate new access and refresh tokens
    const tokens = await this.signTokens(userId, session.user.email);
    const refreshedTokens: Tokens = {
      accessToken: tokens.accessToken,
      refreshToken: refreshToken,
      accessTokenExpiresIn: tokens.accessTokenExpiresIn,
      refreshTokenExpiresIn: this.jwtService.decode(refreshToken)['exp'],
    };

    return refreshedTokens;
  }
}
