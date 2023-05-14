import { User } from '@app/entities/User';
import { UserRoles } from '@app/enums';
import type { IReceiverService } from '@app/modules/receiver/receiver.service.interface';
import { Injectable, Logger } from '@nestjs/common';
import { createPromptModule } from 'inquirer';

@Injectable()
export class ReceiverService implements IReceiverService {
  private readonly prompt = createPromptModule();

  private admin: User;

  constructor(private readonly logger: Logger) {}

  async receiveSuperAdminData(): Promise<User> {
    this.logger.log('Enter Super-admin Data');
    await this.prompt([
      {
        type: 'input',
        name: 'firstname',
        message: 'Enter First name',
      },
      {
        type: 'input',
        name: 'lastname',
        message: 'Enter Last name',
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter Email',
      },
      {
        type: 'input',
        name: 'username',
        message: 'Enter Username',
      },
      {
        type: 'password',
        name: 'password',
        message: 'Enter Password',
      },
    ]).then((answers) => {
      this.admin = new User();
      this.admin.email = answers.email;
      this.admin.password = answers.password;
      this.admin.role = UserRoles.SUPER_ADMIN;
    });

    return this.admin;
  }
}
