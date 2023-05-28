import { Company } from '@app/entities';
import { UserRoles } from '@app/enums';
import { COMPANY_REPOSITORY } from '@app/modules/company/company-repository.interface';
import { ICompanyService } from '@app/modules/company/company-service.interface';
import { CompanyRepository } from '@app/modules/company/company.repository';
import { IUserService, USER_SERVICE } from '@app/modules/user/user.service.interface';
import { BaseService } from '@app/shared/base.service';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class CompanyService extends BaseService<Company> implements ICompanyService {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: CompanyRepository,
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
    @Inject(I18nService)
    private readonly translationService: I18nService,
  ) {
    super(companyRepository);
  }

  async createCompany(company: Company): Promise<Company> {
    try {
      if (await this.userService.isEmailExists(company.owner.email)) {
        throw new BadRequestException(
          this.translationService.translate('Owner email already exists'),
        );
      }
      if (await this.companyRepository.isEmailExists(company.email)) {
        throw new BadRequestException(
          this.translationService.translate('Company email already exists'),
        );
      }
      company.owner.role = UserRoles.ADMIN;
      return await this.companyRepository.createCompany(company);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
