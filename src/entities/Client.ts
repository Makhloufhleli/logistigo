import { Company } from '@app/entities/Company';
import { File } from '@app/entities/File';
import { ChildEntity, Column, OneToMany } from 'typeorm';

@ChildEntity()
export class Client extends Company {
  @Column('varchar', {
    nullable: true,
  })
  code: string;

  @Column('varchar', {
    nullable: true,
  })
  intraCommunityTva: string;

  @Column('varchar', {
    nullable: true,
  })
  homeAddress: string;

  @Column('varchar', {
    nullable: true,
  })
  depositAddress: string;

  @Column('varchar', {
    nullable: true,
  })
  reference: string;

  @Column('varchar', {
    nullable: true,
  })
  invoiceReference: string;

  @Column('varchar', {
    nullable: true,
  })
  rules: string;

  @OneToMany(() => File, (file) => file.client)
  documents: Array<File>;
}
