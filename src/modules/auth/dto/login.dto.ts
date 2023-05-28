import { Constants, PASSWORD_REGEX } from '@app/constants/Constants';
import { Match } from '@app/decorators/password-matches.decorator';
import { UserAgentDto } from '@app/modules/auth/dto/user-agent.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    default: Constants.EMPTY_STRING,
    example: 'mhelali@email.com',
  })
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @ApiProperty({
    minimum: Constants.PASSWORD_MIN_LENGTH,
    default: Constants.EMPTY_STRING,
    example: 'Makhlouf-2023',
  })
  @IsString({ message: 'Password should be a string' })
  @Matches(PASSWORD_REGEX, {
    message:
      'Password shuld contains at least one character uppercase, one character lowercase, one number and one special character and one number',
  })
  password!: string;

  @ApiProperty({
    minimum: Constants.PASSWORD_MIN_LENGTH,
    default: Constants.EMPTY_STRING,
    example: 'Makhlouf-2023',
  })
  @Type(() => String)
  @IsString({ message: 'Password should be a string' })
  @Match('password', { message: 'Passwords do not match' })
  @Exclude({ toPlainOnly: true })
  passwordConfirmation!: string;

  @IsOptional()
  values: UserAgentDto;
}
