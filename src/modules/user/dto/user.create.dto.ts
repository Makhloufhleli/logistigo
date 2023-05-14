import { Constants, PASSWORD_REGEX } from '@app/constants/Constants';
import { Match } from '@app/middlewares/Match';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    minimum: 6,
    default: Constants.EMPTY_STRING,
    example: 'johndoe',
  })
  @Type(() => String)
  @IsString()
  @MinLength(6, { message: 'username must not be less than 6 characters' })
  username: string;

  @ApiProperty({
    minimum: Constants.PASSWORD_MIN_LENGTH,
    default: Constants.EMPTY_STRING,
    example: '12345678',
  })
  @Type(() => String)
  @IsString()
  @Matches(PASSWORD_REGEX, {
    message:
      'Password shuld contains at least one character uppercase, one character lowercase, one number and one special character and one number',
  })
  password!: string;

  @ApiProperty({
    minimum: Constants.PASSWORD_MIN_LENGTH,
    default: Constants.EMPTY_STRING,
    example: '12345678',
  })
  @Type(() => String)
  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  @Exclude({ toPlainOnly: true })
  passwordConfirmation!: string;

  @ApiProperty({
    default: Constants.EMPTY_STRING,
    example: 'john.doe@email.com',
  })
  @Type(() => String)
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
