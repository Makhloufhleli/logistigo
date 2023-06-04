import { Company } from '@app/entities';
import { CreateCompanyDto } from '@app/modules/company/dto/create-company.dto';
import { ReadCompanyDto } from '@app/modules/company/dto/read-company.dto';
import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap<CreateCompanyDto, Company>(mapper, CreateCompanyDto, Company);
      createMap<Company, ReadCompanyDto>(mapper, Company, ReadCompanyDto);
    };
  }
}
