import { User } from '@app/entities';
import { ISeederService } from '@app/modules/seeder/seeder.services.interfaces';
import { IUserService, USERS_SERVICE } from '@app/modules/user/user.service.interface';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SeederService implements ISeederService {
  private readonly logger = new Logger(SeederService.name);
  constructor(
    @Inject(USERS_SERVICE)
    private userService: IUserService,
  ) {}

  async seedSuperAdmin(admin: User) {
    try {
      return this.userService.createUser(admin);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
