import { User } from '@app/entities';
import { Invoice } from '@app/entities/Invoice';
import { Mission } from '@app/entities/Mission';
import { CompanyType } from '@app/enums';
import { AbstractEntity } from '@app/shared/abstract.entity';
import { AutoMap } from '@automapper/classes';
import { Column, Entity, OneToMany, OneToOne, TableInheritance } from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Company extends AbstractEntity {
  @Column('varchar', {
    nullable: true,
  })
  @AutoMap()
  name: string;

  @Column('varchar', {
    nullable: true,
  })
  @AutoMap()
  siret: string;

  @Column('boolean', {
    nullable: true,
  })
  @AutoMap()
  payed: boolean;

  @Column('varchar', {
    nullable: true,
  })
  @AutoMap()
  address: string;

  @Column('varchar', {
    nullable: true,
    unique: true,
  })
  @AutoMap()
  email: string;

  @Column('int', {
    nullable: true,
  })
  @AutoMap()
  numberOfAgents: number;

  @Column('double', {
    nullable: true,
  })
  @AutoMap()
  tva: number;

  @Column('varchar', {
    nullable: true,
  })
  @AutoMap()
  logo: string;

  @Column({
    default: CompanyType.SMALL_BUSINESS,
    enum: CompanyType,
    type: 'enum',
  })
  @AutoMap()
  type: CompanyType;

  @Column('varchar', {
    nullable: true,
  })
  @AutoMap()
  natureOfBusiness: string;

  @Column('varchar', {
    nullable: true,
  })
  @AutoMap()
  optimizationTarget: string;

  @Column('double', {
    nullable: true,
  })
  @AutoMap()
  capital: number;

  @OneToOne(() => User, (user) => user.ownedCompany, { nullable: true, cascade: true })
  @AutoMap(() => User)
  owner: User;

  @OneToMany(() => User, (user) => user.employingCompany)
  employees: Array<User>;

  @OneToMany(() => Invoice, (invoice) => invoice.company)
  invoices: Array<Invoice>;

  @OneToMany(() => Mission, (mission) => mission.company)
  missions: Array<Mission>;
}
