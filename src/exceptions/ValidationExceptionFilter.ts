import { messages } from '@app/constants/messages';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpStatus, Logger, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ValidationError } from 'class-validator';
import type { Response } from 'express';

const {
  exceptions: { UNPROCESSABLE_ENTITY },
} = messages;

@Catch(UnprocessableEntityException)
export class ValidationExceptionFilter implements ExceptionFilter {
  private logger: Logger = new Logger(ValidationExceptionFilter.name);

  constructor(private readonly configService: ConfigService) {}

  private environment = this.configService.get('NODE_ENV');

  catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const stack = exception.stack;

    const errors = exception.getResponse() as {
      message: ValidationError[];
    };
    const errorMessages = errors.message.map((message: ValidationError) => ({
      property: message.property,
      value: message.value,
      constraints: message.constraints,
    }));
    this.logger.error(errorMessages);

    return this.handleException(
      response,
      errorMessages,
      HttpStatus.UNPROCESSABLE_ENTITY,
      UNPROCESSABLE_ENTITY,
      stack,
    );
  }

  private handleException = (response, exception, statusCode, defaultMessage, stack) =>
    response.status(statusCode).json({
      statusCode,
      message: exception || defaultMessage,
      ...(this.environment === 'development' && { stack }),
    });
}
