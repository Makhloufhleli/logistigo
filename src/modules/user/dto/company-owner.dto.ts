import { EmailField } from '@app/decorators/fields.decorator';
import { AutoMap } from '@automapper/classes';

export class CompanyOwnerDto {
  @EmailField({ swagger: true, required: true, example: 'johndoe@email.com' })
  @AutoMap()
  email!: string;
}
