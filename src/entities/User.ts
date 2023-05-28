import { EmailField, EnumField, StringField } from '@app/decorators/fields.decorator';
import { Company, Session } from '@app/entities';
import { UserRoles } from '@app/enums';
import { AbstractEntity } from '@app/shared/abstract.entity';
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
  @Column({ unique: true })
  @EmailField({ swagger: true, required: true, example: 'foulen@email.com' })
  email!: string;

  @Exclude({ toPlainOnly: true })
  @Column('varchar', {
    nullable: true,
    length: 128,
  })
  @StringField({ swagger: true, required: true, example: 'User password' })
  password: string;

  @Column('varchar', {
    nullable: true,
  })
  @StringField({ swagger: true, required: true, example: 'User photo' })
  photo: string;

  @Column('varchar', {
    nullable: true,
  })
  @StringField({ swagger: true, required: true, example: 'User address' })
  address: string;

  @Column({
    default: UserRoles.USER,
    enum: UserRoles,
    type: 'enum',
  })
  @EnumField(() => UserRoles, {
    swagger: true,
    required: true,
    examples: [UserRoles.USER, UserRoles.ADMIN],
    example: UserRoles.ADMIN,
    default: UserRoles.ADMIN,
  })
  role!: UserRoles;

  @OneToMany(() => Session, (session) => session.user)
  sessions: Array<Session>;

  @OneToOne(() => Company, (company) => company.owner, { nullable: true })
  @JoinColumn({ name: 'owned_company_Id' })
  ownedCompany: Company;

  @ManyToOne(() => Company, (company) => company.employees, { nullable: true })
  @JoinColumn({ name: 'employing_company_Id' })
  employingCompany: Company;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
