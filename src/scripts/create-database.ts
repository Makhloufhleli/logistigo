import { SetupManager } from '@app/modules/setup/setup.manager';
import { SetupModule } from '@app/modules/setup/setup.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const context = await NestFactory.create(SetupModule);
  const logger = context.get(Logger);
  const setUpManager = context.get(SetupManager);

  try {
    await setUpManager.create().then(() => {
      void context.close();
    });
  } catch (error) {
    logger.error('Database creation failed!');

    throw error;
  }
}

void bootstrap();
