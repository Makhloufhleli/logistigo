import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  IMigrationsService,
  MIGRATIONS_SERVICE,
} from '@app/modules/migrations/migrations.services.interfaces';

@Injectable()
export class MigrationsManager {
  private readonly logger = new Logger(MigrationsManager.name);

  constructor(
    @Inject(MIGRATIONS_SERVICE)
    private readonly migrationsService: IMigrationsService,
  ) {}

  async generateMigration() {
    this.logger.log('Generating migration...');
    await this.migrationsService.generateMigration();
    this.logger.log('Migration generated successfully');
  }

  async runMigration() {
    this.logger.log('Running migration...');
    await this.migrationsService.runMigration();
    this.logger.log('Migration run successfully');
  }

  async revertMigration() {
    this.logger.log('Reverting migration...');
    await this.migrationsService.revertMigration();
    this.logger.log('Migration reverted successfully');
  }
}
