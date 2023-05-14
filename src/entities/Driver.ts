import { Irregularity } from '@app/entities/Irregularity';
import { User } from '@app/entities/User';
import { Vehicle } from '@app/entities/Vehicle';
import { DriverStatus } from '@app/enums/DriverStatus';
import { ChildEntity, Column, OneToMany, OneToOne } from 'typeorm';

@ChildEntity()
export class Driver extends User {
  @Column('varchar', { nullable: false })
  type: string;

  @Column('varchar', { nullable: false })
  drivingLicense: string;

  @Column('varchar', { nullable: false })
  qualifications: string;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.driver)
  vehicle: Vehicle;

  @Column({
    default: DriverStatus.ACTIVE,
    enum: DriverStatus,
    type: 'enum',
  })
  status: DriverStatus;

  @Column('varchar', { nullable: false })
  state: string;

  @Column('varchar', { nullable: false })
  reference: string;

  @OneToMany(() => Irregularity, (irregularity) => irregularity.driver)
  sinsAndFines: Array<Irregularity>;
}
