import { Inject, Injectable, Logger } from '@nestjs/common';

import { ISetupService, SETUP_SERVICE } from '@app/modules/setup/setup.service.interface';

@Injectable()
export class SetupManager {
  private readonly logger = new Logger(SetupManager.name);

  constructor(
    @Inject(SETUP_SERVICE)
    private readonly setupService: ISetupService,
  ) {}

  async create() {
    this.logger.log('Creating database');
    await this.setupService.createDatabase();
    this.logger.log('Database created successfully');
  }

  async drop() {
    this.logger.log('Dropping database...');
    await this.setupService.dropDatabase();
    this.logger.log('Database dropped successfully');
  }
}
