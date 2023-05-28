import { StringProperty } from '@app/decorators/dto-properties-docs.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty({ message: 'Refresh token is required' })
  @IsString({ message: 'Refresh token must be a string' })
  @StringProperty({ required: true })
  refreshToken: string;
}
