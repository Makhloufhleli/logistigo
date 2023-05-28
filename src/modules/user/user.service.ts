import { User } from '@app/entities';
import { IUserRepository, USER_REPOSITORY } from '@app/modules/user/user.repository.interfaces';
import { IUserService } from '@app/modules/user/user.service.interface';
import { BaseService } from '@app/shared/base.service';
import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService extends BaseService<User> implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: IUserRepository,
  ) {
    super(userRepository);
  }
  async restoreUser(id: number): Promise<boolean> {
    try {
      return await this.userRepository.restoreUser(id);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
  async isUsernameExists(username: string): Promise<boolean> {
    try {
      return await this.userRepository.isUsernameExists(username);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
  async isEmailExists(email: string): Promise<boolean> {
    try {
      return await this.userRepository.isEmailExists(email);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
  async isIdExists(id: number): Promise<boolean> {
    try {
      return await this.userRepository.isIdExists(id);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.getUserByEmail(email);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<User> {
    try {
      return await this.userRepository.getUserByUsername(username);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      if (!(await this.userRepository.isIdExists(id))) {
        throw new BadRequestException('No user found with this id');
      }
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

  async updateUser(id: number, user: User): Promise<User> {
    try {
      if (!(await this.userRepository.isIdExists(id))) {
        throw new BadRequestException('User does not exist');
      }
      const updatedUser: User = Object.assign(new User(), user);
      await this.userRepository.updateUser(id, updatedUser);
      return await this.getUserById(id);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      if (!(await this.userRepository.isIdExists(id))) {
        throw new BadRequestException('User does not exist');
      }
      return await this.userRepository.deleteUser(id);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
