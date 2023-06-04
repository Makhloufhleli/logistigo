import { User } from '@app/entities';
import { CompanyOwnerDto } from '@app/modules/user/dto/company-owner.dto';
import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import { ReadUserDto } from '@app/modules/user/dto/read-user.dto';
import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap<CreateUserDto, User>(mapper, CreateUserDto, User);
      createMap<User, ReadUserDto>(mapper, User, ReadUserDto);
      createMap<CompanyOwnerDto, User>(mapper, CompanyOwnerDto, User);
    };
  }
}
