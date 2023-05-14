import { MigrationsManager } from '@app/modules/migrations/migrations.manager';
import { MigrationsModule } from '@app/modules/migrations/migrations.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const context = await NestFactory.create(MigrationsModule);
  const logger = context.get(Logger);
  const databaseManager = context.get(MigrationsManager);

  try {
    await databaseManager.runMigration().then(() => {
      void context.close();
    });
  } catch (error) {
    logger.error('Migration running failed!');

    throw error;
  }
}

void bootstrap();
