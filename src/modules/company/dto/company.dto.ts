import {
  BooleanField,
  EmailField,
  EnumField,
  NumberField,
  StringField,
} from '@app/decorators/fields.decorator';
import { AutoMap } from '@automapper/classes';

import { CompanyType } from '@app/enums';

export class CompanyDto {
  @AutoMap()
  id: number;

  @StringField({ swagger: true, required: true, example: 'Company name' })
  @AutoMap()
  name: string;

  @StringField({ swagger: true, required: true, example: 'Company siret' })
  @AutoMap()
  siret: string;

  @BooleanField({ swagger: true, required: true, example: true })
  @AutoMap()
  payed: boolean;

  @StringField({ swagger: true, required: true, example: 'Company address' })
  @AutoMap()
  address: string;

  @EmailField({ swagger: true, required: true, example: 'company@email.com' })
  @AutoMap()
  email: string;

  @NumberField({ swagger: true, required: true, example: 100 })
  @AutoMap()
  numberOfAgents: number;

  @NumberField({ swagger: true, required: true, example: 19 })
  @AutoMap()
  tva: number;

  @StringField({ swagger: true, required: true, example: 'Company logo' })
  @AutoMap()
  logo: string;

  @EnumField(() => CompanyType, {
    swagger: true,
    required: true,
    examples: CompanyType,
    example: CompanyType.SMALL_BUSINESS,
  })
  @AutoMap()
  type: CompanyType;

  @StringField({ swagger: true, required: true, example: 'Company business nature' })
  @AutoMap()
  natureOfBusiness: string;

  @StringField({ swagger: true, required: true, example: 'Company optimization target' })
  @AutoMap()
  optimizationTarget: string;

  @NumberField({ swagger: true, required: true, example: 1000 })
  @AutoMap()
  capital: number;
}
