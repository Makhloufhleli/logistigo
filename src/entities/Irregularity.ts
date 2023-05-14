import { Driver } from '@app/entities/Driver';
import { Vehicle } from '@app/entities/Vehicle';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Irregularity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  code: string;

  @Column('varchar', { nullable: false })
  description: string;

  @Column('varchar', { nullable: false })
  type: string;

  @Column('varchar', { nullable: false })
  date: Date;

  @Column('varchar', { nullable: false })
  amount: number;

  @Column('varchar', { nullable: false })
  status: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.sinsAndFines)
  vehicle: Vehicle;

  @ManyToOne(() => Driver, (driver) => driver.sinsAndFines)
  driver: Driver;

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
