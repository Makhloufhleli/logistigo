import { User } from '@app/entities';
import { IUserRepository } from '@app/modules/user/user.repository.interfaces';
import { BaseRepository } from '@app/shared/base.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor(private dataSource: DataSource) {
    super(User, dataSource);
  }
  async createUser(user: User): Promise<User> {
    return await this.save(user);
  }

  async updateUser(id: number, user: User): Promise<boolean> {
    return (
      (await this.createQueryBuilder('user').update().set(user).where('id = :id', { id }).execute())
        .affected > 0
    );
  }

  async getUserByUsername(username: string): Promise<User> {
    try {
      return await this.createQueryBuilder('user')
        .where('user.username = :username', { username })
        .getOne();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      return await this.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getUserById(id: number): Promise<User> {
    return await this.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
  }

  async deleteUser(id: number): Promise<boolean> {
    return (
      (await this.createQueryBuilder('user').softDelete().where('user.id = :id', { id }).execute())
        .affected > 0
    );
  }

  async restoreUser(id: number): Promise<boolean> {
    return (
      (
        await this.createQueryBuilder('user')
          .update()
          .set({ deletedAt: null })
          .where('user.id = :id', { id })
          .execute()
      ).affected > 0
    );
  }

  async isUsernameExists(username: string): Promise<boolean> {
    return (
      (await this.createQueryBuilder('user')
        .where('user.username = :username', { username })
        .getCount()) > 0
    );
  }

  async isEmailExists(email: string): Promise<boolean> {
    return (
      (await this.createQueryBuilder('user').where('user.email = :email', { email }).getCount()) > 0
    );
  }

  async isIdExists(id: number): Promise<boolean> {
    return (
      (await this.createQueryBuilder('user')
        .withDeleted()
        .where('user.id = :id', { id })
        .getCount()) > 0
    );
  }
}
