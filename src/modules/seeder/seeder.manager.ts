import { User } from '@app/entities';
import {
  IReceiverService,
  RECEIVER_SERVICE,
} from '@app/modules/receiver/receiver.service.interface';
import { ISeederService, SEEDER_SERVICE } from '@app/modules/seeder/seeder.services.interfaces';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SeederManager {
  private readonly logger = new Logger(SeederManager.name);

  constructor(
    @Inject(SEEDER_SERVICE)
    private readonly seederService: ISeederService,
    @Inject(RECEIVER_SERVICE)
    private readonly receiverService: IReceiverService,
  ) {}

  async seedSuperAdmin() {
    const adminData: User = await this.receiverService.receiveSuperAdminData();
    this.logger.log('Saving Admin');
    await this.seederService.seedSuperAdmin(adminData);
    this.logger.log('Admin seeded successfully');
  }
}
