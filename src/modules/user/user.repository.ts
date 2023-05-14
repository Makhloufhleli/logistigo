import { User } from '@app/entities';
import { IUsersRepository } from '@app/modules/user/user.repository.interfaces';
import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> implements IUsersRepository {
  private logger: Logger = new Logger(UserRepository.name);
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async getUserById(id: number): Promise<User> {
    try {
      return await this.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  async isEmailExists(email: string): Promise<boolean> {
    try {
      return (
        (await this.createQueryBuilder('user').where('user.email = :email', { email }).getCount()) >
        0
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  async isUsernameExists(username: string): Promise<boolean> {
    try {
      return (
        (await this.createQueryBuilder('user')
          .where('user.username = :username', { username })
          .getCount()) > 0
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      return await this.save(user);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
