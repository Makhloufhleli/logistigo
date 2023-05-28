import { Company } from '@app/entities';
import { CompanyController } from '@app/modules/company/company.controller';
import { CompanyProviders } from '@app/modules/company/company.providers';
import { UserModule } from '@app/modules/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), UserModule],
  controllers: [CompanyController],
  providers: [...CompanyProviders],
  exports: [...CompanyProviders],
})
export class CompanyModule {}
