import { User } from '@app/entities';
import { CreateUserDto } from '@app/modules/user/dto/user.create.dto';
import { IUsersRepository, USER_REPOSITORY } from '@app/modules/user/user.repository.interfaces';
import { IUserService } from '@app/modules/user/user.service.interface';
import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService implements IUserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@Inject(USER_REPOSITORY) private userRepository: IUsersRepository) {}
  async getUserById(id: number): Promise<User> {
    try {
      return await this.userRepository.getUserById(id);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      if (await this.userRepository.isEmailExists(user.email)) {
        throw new ConflictException('Email already exists');
      }
      return await this.userRepository.createUser(user);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async createUserFromDto(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.createUser(Object.assign(new User(), createUserDto));
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
