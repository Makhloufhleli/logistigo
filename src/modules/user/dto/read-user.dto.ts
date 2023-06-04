import { ReadCompanyDto } from '@app/modules/company/dto/read-company.dto';
import { UserDto } from '@app/modules/user/dto/user.dto';
import { AutoMap } from '@automapper/classes';

export class ReadUserDto extends UserDto {
  @AutoMap(() => ReadCompanyDto)
  ownedCompany: ReadCompanyDto;

  @AutoMap(() => ReadCompanyDto)
  employingCompany: ReadCompanyDto;
}
