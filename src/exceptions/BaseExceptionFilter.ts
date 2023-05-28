import { messages } from '@app/constants/messages';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import {
  BadGatewayException,
  BadRequestException,
  Catch,
  ConflictException,
  ForbiddenException,
  GatewayTimeoutException,
  GoneException,
  HttpStatus,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
const {
  exceptions: {
    INTERNAL_SERVER_ERROR,
    BAD_GATEWAY,
    CONFLICT,
    FORBIDDEN,
    GONE,
    UNAUTHORIZED,
    GATEWAY_TIMEOUT,
    NOT_FOUND,
    BAD_REQUEST,
  },
} = messages;

@Catch(Error)
export class BaseExceptionFilter implements ExceptionFilter {
  private logger: Logger = new Logger(BaseExceptionFilter.name);

  constructor(private readonly configService: ConfigService) {}

  private environment = this.configService.get('NODE_ENV');

  catch(exception: Error, host: ArgumentsHost) {
    this.logger.error(JSON.stringify(exception));
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const stack = exception.stack;

    switch (exception.constructor) {
      case UnauthorizedException: {
        return this.handleException(
          response,
          exception,
          HttpStatus.UNAUTHORIZED,
          UNAUTHORIZED,
          stack,
        );
      }

      case BadGatewayException: {
        return this.handleException(
          response,
          exception,
          HttpStatus.BAD_GATEWAY,
          BAD_GATEWAY,
          stack,
        );
      }

      case ConflictException: {
        return this.handleException(response, exception, HttpStatus.CONFLICT, CONFLICT, stack);
      }

      case ForbiddenException: {
        return this.handleException(response, exception, HttpStatus.FORBIDDEN, FORBIDDEN, stack);
      }

      case GatewayTimeoutException: {
        return this.handleException(
          response,
          exception,
          HttpStatus.GATEWAY_TIMEOUT,
          GATEWAY_TIMEOUT,
          stack,
        );
      }

      case GoneException: {
        return this.handleException(response, exception, HttpStatus.GONE, GONE, stack);
      }

      case NotFoundException: {
        return this.handleException(response, exception, HttpStatus.NOT_FOUND, NOT_FOUND, stack);
      }

      case BadRequestException: {
        return this.handleException(
          response,
          exception,
          HttpStatus.BAD_REQUEST,
          BAD_REQUEST,
          stack,
        );
      }

      default: {
        return this.handleException(
          response,
          exception,
          HttpStatus.INTERNAL_SERVER_ERROR,
          INTERNAL_SERVER_ERROR,
          stack,
        );
      }
    }
  }

  private handleException = (response, exception, statusCode, defaultMessage, stack) =>
    response.status(statusCode).json({
      statusCode,
      message: exception.message || defaultMessage,
      ...(this.environment === 'development' && { stack: stack.split('\n').map((s) => s.trim()) }),
    });
}
