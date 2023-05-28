import { Company } from '@app/entities';
import { IBaseService } from '@app/shared/base.service.interface';

export const COMPANY_SERVICE = 'COMPANY_SERVICE';
export interface ICompanyService extends IBaseService<Company> {
  createCompany(company: Company): Promise<Company>;
}
