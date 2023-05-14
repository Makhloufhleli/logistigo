import { dataSource } from '@app/common/ormconfig';
import { ISetupService } from '@app/modules/setup/setup.service.interface';
import { Injectable } from '@nestjs/common';
import { createDatabase, dropDatabase } from 'typeorm-extension';

@Injectable()
export class SetupService implements ISetupService {
  async createDatabase(): Promise<boolean> {
    await createDatabase({
      ifNotExist: true,
      options: dataSource.options,
    });
    process.exit(0);
  }

  async dropDatabase(): Promise<boolean> {
    await dropDatabase({ ifExist: true, options: dataSource.options });
    process.exit(0);
  }
}
