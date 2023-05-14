import { User } from '@app/entities';
import { Invoice } from '@app/entities/Invoice';
import { Mission } from '@app/entities/Mission';
import { CompanyType } from '@app/enums';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: true,
  })
  name: string;

  @Column('varchar', {
    nullable: true,
  })
  siret: string;

  @Column('boolean', {
    nullable: true,
  })
  payed: boolean;

  @Column('varchar', {
    nullable: true,
  })
  address: string;

  @Column('varchar', {
    nullable: true,
  })
  email: string;

  @Column('int', {
    nullable: true,
  })
  numberOfAgents: number;

  @Column('double', {
    nullable: true,
  })
  tva: number;

  @Column('varchar', {
    nullable: true,
  })
  logo: string;

  @Column({
    default: CompanyType.SMALL_BUSINESS,
    enum: CompanyType,
    type: 'enum',
  })
  type: CompanyType;

  @Column('varchar', {
    nullable: true,
  })
  natureOfBusiness: string;

  @Column('varchar', {
    nullable: true,
  })
  optimizationTarget: string;

  @Column('double', {
    nullable: true,
  })
  capital: number;

  @OneToOne(() => User, (user) => user.companyOwner, { nullable: true })
  owner: User;

  @OneToMany(() => User, (user) => user.companyEmployee)
  employees: Array<User>;

  @OneToMany(() => Invoice, (invoice) => invoice.company)
  invoices: Array<Invoice>;

  @OneToMany(() => Mission, (mission) => mission.company)
  missions: Array<Mission>;

  @Exclude({ toPlainOnly: true })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn()
  deletedAt!: Date;
}
