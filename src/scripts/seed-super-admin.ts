import { SeederModule } from '@app/modules/seeder/Seeder.module';
import { SeederManager } from '@app/modules/seeder/seeder.manager';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const context = await NestFactory.create(SeederModule);
  const logger = context.get(Logger);
  const seeder = context.get(SeederManager);

  try {
    await seeder.seedSuperAdmin().then(() => {
      void context.close();
    });
  } catch (error) {
    logger.error('Seeding failed!');

    throw error;
  }
}

void bootstrap();
