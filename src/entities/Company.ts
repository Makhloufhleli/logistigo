import {
  BooleanField,
  EmailField,
  EnumField,
  NumberField,
  StringField,
} from '@app/decorators/fields.decorator';
import { User } from '@app/entities';
import { Invoice } from '@app/entities/Invoice';
import { Mission } from '@app/entities/Mission';
import { CompanyType } from '@app/enums';
import { AbstractEntity } from '@app/shared/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Company extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: true,
  })
  @StringField({ swagger: true, required: true, example: 'Company name' })
  name: string;

  @Column('varchar', {
    nullable: true,
  })
  @StringField({ swagger: true, required: true, example: 'Company siret' })
  siret: string;

  @Column('boolean', {
    nullable: true,
  })
  @BooleanField({ swagger: true, required: true, example: true })
  payed: boolean;

  @Column('varchar', {
    nullable: true,
  })
  @StringField({ swagger: true, required: true, example: 'Company address' })
  address: string;

  @Column('varchar', {
    nullable: true,
    unique: true,
  })
  @EmailField({ swagger: true, required: true, example: 'company@email.com' })
  email: string;

  @Column('int', {
    nullable: true,
  })
  @NumberField({ swagger: true, required: true, example: 100 })
  numberOfAgents: number;

  @Column('double', {
    nullable: true,
  })
  @NumberField({ swagger: true, required: true, example: 19 })
  tva: number;

  @Column('varchar', {
    nullable: true,
  })
  @StringField({ swagger: true, required: true, example: 'Company logo' })
  logo: string;

  @Column({
    default: CompanyType.SMALL_BUSINESS,
    enum: CompanyType,
    type: 'enum',
  })
  @EnumField(() => CompanyType, {
    swagger: true,
    required: true,
    examples: CompanyType,
    example: CompanyType.SMALL_BUSINESS,
  })
  type: CompanyType;

  @Column('varchar', {
    nullable: true,
  })
  @StringField({ swagger: true, required: true, example: 'Company business nature' })
  natureOfBusiness: string;

  @Column('varchar', {
    nullable: true,
  })
  @StringField({ swagger: true, required: true, example: 'Company optimization target' })
  optimizationTarget: string;

  @Column('double', {
    nullable: true,
  })
  @NumberField({ swagger: true, required: true, example: 1000 })
  capital: number;

  @OneToOne(() => User, (user) => user.ownedCompany, { nullable: true, cascade: true })
  @ValidateNested({ each: true })
  @ApiProperty({ type: () => User })
  @IsNotEmptyObject({ nullable: false })
  owner: User;

  @OneToMany(() => User, (user) => user.employingCompany)
  employees: Array<User>;

  @OneToMany(() => Invoice, (invoice) => invoice.company)
  invoices: Array<Invoice>;

  @OneToMany(() => Mission, (mission) => mission.company)
  missions: Array<Mission>;
}
