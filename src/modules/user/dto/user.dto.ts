import { EmailField, StringField } from '@app/decorators/fields.decorator';
import { AutoMap } from '@automapper/classes';

export class UserDto {
  @AutoMap()
  id: number;

  @EmailField({ swagger: true, required: true, example: 'johndoe@email.com' })
  @AutoMap()
  email!: string;

  @StringField({ swagger: true, required: true, example: 'avatar.png' })
  @AutoMap()
  photo: string;

  @StringField({ swagger: true, required: true, example: 'User address' })
  @AutoMap()
  address: string;
}
