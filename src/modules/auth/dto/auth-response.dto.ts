import { User } from '@app/entities';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ type: 'string' })
  accessToken: string;
  @ApiProperty({ type: 'string' })
  refreshToken: string;
  @ApiProperty({ type: 'number' })
  accessTokenExpiresIn: number;
  @ApiProperty({ type: 'number' })
  refreshTokenExpiresIn: number;
  @ApiProperty({ type: User })
  user?: User;
}
