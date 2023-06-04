import { PASSWORD_REGEX } from '@app/constants/Constants';
import { StringField } from '@app/decorators/fields.decorator';
import { Match } from '@app/decorators/password-matches.decorator';
import { UserDto } from '@app/modules/user/dto/user.dto';
import { AutoMap } from '@automapper/classes';
import { Matches } from 'class-validator';

export class CreateUserDto extends UserDto {
  @StringField({ swagger: true, required: true, example: 'Azerty-2023' })
  @AutoMap()
  @Matches(PASSWORD_REGEX, {
    message:
      'Password should contains at least one character uppercase, one character lowercase, one number and one special character and one number',
  })
  password: string;

  @StringField({ swagger: true, required: true, example: 'Azerty-2023' })
  @Match('password', { message: 'Password confirmation should match password' })
  passwordConfirmation: string;
}
