import { Company, Session } from '@app/entities';
import { UserRoles } from '@app/enums';
import { AbstractEntity } from '@app/shared/abstract.entity';
import { AutoMap } from '@automapper/classes';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class User extends AbstractEntity {
  @Column('varchar', {
    nullable: true,
    length: 128,
  })
  @AutoMap()
  firstName: string;

  @Column('varchar', {
    nullable: true,
    length: 128,
  })
  @AutoMap()
  lastName: string;

  @Column({ unique: true })
  @AutoMap()
  email!: string;

  @Exclude({ toPlainOnly: true })
  @Column('varchar', {
    nullable: true,
    length: 128,
  })
  @AutoMap()
  password: string;

  @Column('varchar', {
    nullable: true,
  })
  @AutoMap()
  photo: string;

  @Column('varchar', {
    nullable: true,
  })
  @AutoMap()
  address: string;

  @Column({
    default: UserRoles.USER,
    enum: UserRoles,
    type: 'enum',
  })
  @AutoMap()
  role!: UserRoles;

  @OneToMany(() => Session, (session) => session.user)
  sessions: Array<Session>;

  @OneToOne(() => Company, (company) => company.owner, { nullable: true })
  @JoinColumn({ name: 'owned_company_Id' })
  @AutoMap(() => Company)
  ownedCompany: Company;

  @ManyToOne(() => Company, (company) => company.employees, { nullable: true })
  @JoinColumn({ name: 'employing_company_Id' })
  @AutoMap(() => Company)
  employingCompany: Company;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
