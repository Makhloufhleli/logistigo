import { MigrationsModule } from '@app/modules/migrations/migrations.module';
import { IMigrationsService } from '@app/modules/migrations/migrations.services.interfaces';
import { Injectable, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { DataSource, MigrationExecutor } from 'typeorm';

@Injectable()
export class MigrationsService implements IMigrationsService {
  private readonly logger = new Logger(MigrationsService.name);

  async generateMigration(): Promise<boolean> {
    const app = await NestFactory.createApplicationContext(MigrationsModule);
    const dataSource = app.get(DataSource);

    try {
      const schemaBuilder = dataSource.driver.createSchemaBuilder();
      const migration = await schemaBuilder.log();
      const migrationName = `Migration${Date.now()}`;

      if (migration.upQueries.length === 0) {
        this.logger.warn('No changes detected in the database schema.');
        await app.close();

        return false;
      }

      const contents = `
          import { MigrationInterface, QueryRunner } from "typeorm";
  
          export class ${migrationName} implements MigrationInterface {
            name = '${migrationName}'
  
            public async up(queryRunner: QueryRunner): Promise<void> {
              ${migration.upQueries
                .map((query) => `await queryRunner.query("${query.query}");`)
                .join('\n')}
            }
  
            public async down(queryRunner: QueryRunner): Promise<void> {
              ${migration.downQueries
                .map((query) => `await queryRunner.query("${query.query}");`)
                .join('\n')}
            }
          }
        `;

      const migrationDirectory = `${process.cwd()}/src/migrations`;

      if (!fs.existsSync(migrationDirectory)) {
        // Create directory if it does not exist
        fs.mkdirSync(migrationDirectory);
      }

      fs.writeFileSync(`${migrationDirectory}/${migrationName}.ts`, contents.toString());

      this.logger.debug(`Migration file generated: ${migrationName}`);
    } finally {
      await app.close();
    }

    return true;
  }

  async runMigration(): Promise<void> {
    const app = await NestFactory.createApplicationContext(MigrationsModule);
    const dataSource = app.get(DataSource);

    try {
      await dataSource.driver.createSchemaBuilder().build();
    } finally {
      await app.close();
    }
  }

  async revertMigration(): Promise<void> {
    const app = await NestFactory.createApplicationContext(MigrationsModule);
    const dataSource = app.get(DataSource);

    try {
      const migrationExecutor = new MigrationExecutor(dataSource);
      const appliedMigrations = await migrationExecutor.getExecutedMigrations();

      if (appliedMigrations.length === 0) {
        this.logger.debug('No migrations to revert');

        return;
      }

      const lastMigration = appliedMigrations[appliedMigrations.length - 1];

      await migrationExecutor.undoLastMigration();
      this.logger.debug(`Migration '${lastMigration}' reverted`);
    } finally {
      await app.close();
    }
  }
}
