import { Company } from '@app/entities';
import { IBaseRepository } from '@app/shared/base.repository.interface';

export const COMPANY_REPOSITORY = 'COMPANY_REPOSITORY';
export interface ICompanyRepository extends IBaseRepository<Company> {
  createCompany(company: Company): Promise<Company>;
  isEmailExists(email: string): Promise<boolean>;
}
