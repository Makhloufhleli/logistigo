import { CompanyDto } from '@app/modules/company/dto/company.dto';
import { CompanyOwnerDto } from '@app/modules/user/dto/company-owner.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';

export class CreateCompanyDto extends CompanyDto {
  @ValidateNested({ each: true })
  @ApiProperty({ type: () => CompanyOwnerDto })
  @IsNotEmptyObject({ nullable: false })
  @AutoMap(() => CompanyOwnerDto)
  owner: CompanyOwnerDto;
}
