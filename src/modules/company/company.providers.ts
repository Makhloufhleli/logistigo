import { COMPANY_REPOSITORY } from '@app/modules/company/company-repository.interface';
import { COMPANY_SERVICE } from '@app/modules/company/company-service.interface';
import { CompanyRepository } from '@app/modules/company/company.repository';
import { CompanyService } from '@app/modules/company/company.service';
import { Provider } from '@nestjs/common';

export const CompanyProviders: Provider[] = [
  { provide: COMPANY_REPOSITORY, useClass: CompanyRepository },
  { provide: COMPANY_SERVICE, useClass: CompanyService },
];
