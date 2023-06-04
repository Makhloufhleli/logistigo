import { Company } from '@app/entities';
import { CreateCompanyDto } from '@app/modules/company/dto/create-company.dto';
import { ReadCompanyDto } from '@app/modules/company/dto/read-company.dto';
import { IBaseService } from '@app/shared/base.service.interface';

export const COMPANY_SERVICE = 'COMPANY_SERVICE';
export interface ICompanyService extends IBaseService<Company> {
  createCompany(company: CreateCompanyDto): Promise<ReadCompanyDto>;
}
