import { Session } from '@app/entities/Session';
import { IAuthService } from '@app/modules/auth/auth.service.interface';
import { AuthResponseDto } from '@app/modules/auth/dto/auth-response.dto';
import { LoginDto } from '@app/modules/auth/dto/login.dto';
import { IJwtService, JWT_SERVICE } from '@app/modules/jwt/jwt.service.interface.ts';
import { ISessionService, SESSION_SERVICE } from '@app/modules/session/session.service.interface';
import { IUserService, USER_SERVICE } from '@app/modules/user/user.service.interface';
import { BadRequestException, Inject, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
    @Inject(JWT_SERVICE)
    private readonly jwtService: IJwtService,
    @Inject(SESSION_SERVICE)
    private readonly sessionService: ISessionService,
  ) {}

  async logout(userId: number, userAgent: string): Promise<boolean> {
    return await this.sessionService.expireSessionByUserAgent(userId, userAgent);
  }
  async refresh(userId: number, userAgent: string, refreshToken: string): Promise<AuthResponseDto> {
    try {
      return {
        ...(await this.jwtService.refreshTokens(userId, userAgent, refreshToken)),
        user: await this.userService.getUserById(userId),
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async login(LoginDto: LoginDto): Promise<AuthResponseDto> {
    try {
      if (!(await this.userService.isEmailExists(LoginDto.email))) {
        throw new BadRequestException('Invalid  email or password');
      }
      // verify user password
      const user = await this.userService.getUserByEmail(LoginDto.email);

      if (!(await bcrypt.compare(LoginDto.password, user.password))) {
        throw new BadRequestException('Invalid  email or password');
      }
      // Prepare tokens
      const tokens = await this.jwtService.signTokens(user.id, user.email);

      // Hash refresh token to safely save it into the database
      const hashedRefresh = await bcrypt.hash(tokens.refreshToken, 10);

      // Check if is already connected with the same device
      const isAlreadyConnectedWithAgent = await this.sessionService.isAlreadyHaveSession(
        user.id,
        LoginDto.values.userAgent,
      );

      if (isAlreadyConnectedWithAgent) {
        // get saved session to update
        const savedSession = await this.sessionService.getSessionByUserIdAndUserAgent(
          user.id,
          LoginDto.values.userAgent,
        );
        // if is already connected update the session with a new refresh token
        await this.sessionService.updateSession(savedSession.id, hashedRefresh);

        return {
          user,
          ...tokens,
        };
      } else {
        // Create a new session
        const userSession = new Session(
          LoginDto.values.userAgent,
          LoginDto.values.ipAddress,
          user,
          hashedRefresh,
        );
        await this.sessionService.createSession(userSession);

        return {
          user,
          ...tokens,
        };
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async generatePassword(): Promise<string> {
    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]}|;:,<.>/?';
    let password = '';

    // Generate the required characters
    password += await this.getRandomCharacter('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    password += await this.getRandomCharacter('0123456789');
    password += await this.getRandomCharacter('!@#$%^&*()-_=+[{]}|;:,<.>/?');

    // Fill the remaining characters randomly
    for (let i = 0; i < 5; i++) {
      password += await this.getRandomCharacter(characters);
    }

    // Shuffle the password to ensure randomness
    password = await this.shuffleString(password);

    return password;
  }

  private async getRandomCharacter(characters: string) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }

  private async shuffleString(string: string) {
    const array = string.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
  }
}
