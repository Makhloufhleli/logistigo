import { Company } from '@app/entities';
import { UserRoles } from '@app/enums';
import { AUTH_SERVICE, IAuthService } from '@app/modules/auth/auth.service.interface';
import { COMPANY_REPOSITORY } from '@app/modules/company/company-repository.interface';
import { ICompanyService } from '@app/modules/company/company-service.interface';
import { CompanyRepository } from '@app/modules/company/company.repository';
import { CreateCompanyDto } from '@app/modules/company/dto/create-company.dto';
import { ReadCompanyDto } from '@app/modules/company/dto/read-company.dto';
import { IUserService, USER_SERVICE } from '@app/modules/user/user.service.interface';
import { BaseService } from '@app/shared/base.service';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { MailerService } from '@nestjs-modules/mailer';
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
    private readonly mailerService: MailerService,
    @Inject(AUTH_SERVICE)
    private readonly authService: IAuthService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {
    super(companyRepository);
  }

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<ReadCompanyDto> {
    try {
      if (await this.userService.isEmailExists(createCompanyDto.owner.email)) {
        throw new BadRequestException(
          this.translationService.translate('Owner email already exists'),
        );
      }
      if (await this.companyRepository.isEmailExists(createCompanyDto.email)) {
        throw new BadRequestException(
          this.translationService.translate('Company email already exists'),
        );
      }

      const company = await this.mapper.mapAsync(createCompanyDto, CreateCompanyDto, Company);
      company.owner.role = UserRoles.ADMIN;
      const ownerPassword = await this.authService.generatePassword();
      company.owner.password = ownerPassword;

      this.mailerService
        .sendMail({
          to: company.owner.email,
          subject: `Welcome as ${company.name} Owner on Our Platform(Logistigo)! Your Credentials Enclosed`,
          template: process.cwd() + '/src/templates/email',
          context: {
            email: company.owner.email,
            password: ownerPassword,
          },
        })
        .then(() => {
          this.logger.log(`Email sent to ${company.owner.email}`);
        })
        .catch((error) => {
          this.logger.error(error);
          throw error;
        });

      return await this.mapper.mapAsync(
        await this.companyRepository.createCompany(company),
        Company,
        ReadCompanyDto,
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
