import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const StringProperty = ({
  minLength,
  maxLength,
  required,
}: {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
}) =>
  applyDecorators(
    ApiProperty({
      example: 'string example',
      required,
      minLength,
      maxLength,
    }),
  );
