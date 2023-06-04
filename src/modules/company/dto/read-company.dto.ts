import { CompanyDto } from '@app/modules/company/dto/company.dto';
import { ReadUserDto } from '@app/modules/user/dto/read-user.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ReadCompanyDto extends CompanyDto {
  @ApiProperty({ type: () => [ReadUserDto] })
  @AutoMap(() => [ReadUserDto])
  employees: Array<ReadUserDto>;

  @ApiProperty({ type: () => ReadUserDto })
  @AutoMap(() => ReadUserDto)
  owner: ReadUserDto;

  // TODO - Add invoices and missions

  //   @AutoMap()
  //   invoices: Array<Invoice>;

  //   @AutoMap()
  //   missions: Array<Mission>;
}
