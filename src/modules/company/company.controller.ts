import { AuthorizeWithRoles } from '@app/decorators/authorize-with-roles.decorator';
import { UserRoles } from '@app/enums';
import { AccessTokenGuard } from '@app/guards/access-token.guard';
import { COMPANY_SERVICE } from '@app/modules/company/company-service.interface';
import { CompanyService } from '@app/modules/company/company.service';
import { CreateCompanyDto } from '@app/modules/company/dto/create-company.dto';
import { PaginationParamsDto } from '@app/shared/dto/common.pagination-params.dto';
import { Body, Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@UseGuards(AccessTokenGuard)
@Controller('companies')
@ApiTags('Companies')
@ApiSecurity('JWT-auth')
export class CompanyController {
  constructor(@Inject(COMPANY_SERVICE) private readonly companyService: CompanyService) {}

  @AuthorizeWithRoles(UserRoles.SUPER_ADMIN)
  @Get()
  async getAll(@Query() params: PaginationParamsDto) {
    return await this.companyService.paginate(params);
  }

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return await this.companyService.createCompany(createCompanyDto);
  }
}
