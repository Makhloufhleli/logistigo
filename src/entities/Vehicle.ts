import { Driver } from '@app/entities/Driver';
import { Irregularity } from '@app/entities/Irregularity';
import { VehicleStatus } from '@app/enums/VehicleStatus';
import { VehicleType } from '@app/enums/VehicleType';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  reference: string;

  @Column('varchar', { nullable: false })
  fuelType: string;

  @Column('varchar', { nullable: false })
  api: string;

  @Column({
    default: VehicleStatus.ACTIVE,
    enum: VehicleStatus,
    type: 'enum',
  })
  status: VehicleStatus;

  @Column('varchar', { nullable: false })
  registrationNumber: string;

  @Column({
    default: VehicleType.CAR,
    enum: VehicleType,
    type: 'enum',
  })
  type: VehicleType;

  @Column('varchar', { nullable: false })
  mark: string;

  @Column('varchar', { nullable: false })
  model: string;

  @Column('varchar', { nullable: false })
  modelYear: number;

  @Column('datetime', { nullable: false })
  permissibleDate: Date;

  @Column('datetime', { nullable: false })
  releaseDate: Date;

  @Column('varchar', { nullable: false })
  fuel: string;

  @Column('varchar', { nullable: false })
  gearBox: string;

  @Column('varchar', { nullable: false })
  numberOfDoors: number;

  @Column('varchar', { nullable: false })
  numberOfPlaces: number;

  @Column('varchar', { nullable: false })
  fiscalPower: number;

  @Column('varchar', { nullable: false })
  dynamicPower: number;

  @Column('varchar', { nullable: false })
  drivingLicense: string;

  @Column('varchar', { nullable: false })
  mileAge: number;

  @Column('varchar', { nullable: false })
  color: string;

  @OneToOne(() => Driver, (driver) => driver.vehicle)
  driver: Driver;

  @OneToMany(() => Irregularity, (irregularity) => irregularity.vehicle)
  sinsAndFines: Array<Irregularity>;

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
