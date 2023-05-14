import { Company, Session } from '@app/entities';
import { UserRoles } from '@app/enums';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Exclude()
  @Column('varchar', {
    select: false,
    nullable: true,
    length: 128,
  })
  password: string;

  @Column('varchar', {
    nullable: true,
  })
  photo: string;

  @Column('varchar', {
    nullable: true,
  })
  address: string;

  @Column({
    default: UserRoles.USER,
    enum: UserRoles,
    type: 'enum',
  })
  role!: UserRoles;

  @OneToMany(() => Session, (session) => session.user)
  sessions: Array<Session>;

  @OneToOne(() => Company, (company) => company.owner, { nullable: true })
  companyOwner: Company;

  @ManyToOne(() => Company, (company) => company.employees, { nullable: true })
  companyEmployee: Company;

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

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
