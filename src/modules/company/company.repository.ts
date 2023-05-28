import { Company } from '@app/entities';
import { ICompanyRepository } from '@app/modules/company/company-repository.interface';
import { BaseRepository } from '@app/shared/base.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CompanyRepository extends BaseRepository<Company> implements ICompanyRepository {
  constructor(private dataSource: DataSource) {
    super(Company, dataSource);
  }
  async isEmailExists(email: string): Promise<boolean> {
    return (
      (await this.createQueryBuilder('company')
        .where('company.email = :email', { email })
        .getCount()) > 0
    );
  }

  async createCompany(company: Company): Promise<Company> {
    try {
      return await this.save(company);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
