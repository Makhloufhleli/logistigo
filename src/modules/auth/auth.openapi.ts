import { Public } from '@app/decorators/public.decorator';
import { AccessTokenGuard } from '@app/guards/access-token.guard';
import { RefreshTokenGuard } from '@app/guards/refresh-token.guard';
import { AuthResponseDto } from '@app/modules/auth/dto/auth-response.dto';
import { LoginDto } from '@app/modules/auth/dto/login.dto';
import {
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

export const LoginApiDocs = () =>
  applyDecorators(
    Public(),
    Post('login'),
    ApiTags('Auth'),

    ApiSecurity('JWT-auth'),
    ApiOperation({
      summary:
        'Login user and return access token, refresh token, tokens expiration time and use object',
    }),
    ApiBody({
      type: LoginDto,
    }),
    ApiOkResponse({
      type: AuthResponseDto,
    }),
    HttpCode(HttpStatus.OK),
  );

export const RefreshApiDocs = () =>
  applyDecorators(
    UseGuards(RefreshTokenGuard),
    Patch('refresh'),
    ApiTags('Auth'),
    ApiSecurity('JWT-auth'),
    ApiOperation({
      summary: 'refresh access token based on refresh token',
    }),
    ApiOkResponse({
      type: AuthResponseDto,
    }),
    HttpCode(HttpStatus.OK),
  );

export const LogoutApiDocs = () =>
  applyDecorators(
    Delete('logout'),
    ApiTags('Auth'),
    ApiSecurity('JWT-auth'),
    ApiOperation({
      summary: 'refresh access token based on refresh token',
    }),
    ApiOkResponse({
      type: Boolean,
    }),
    UseGuards(AccessTokenGuard),
    HttpCode(HttpStatus.OK),
  );
