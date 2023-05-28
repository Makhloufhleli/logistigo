import { User } from '@app/entities/User';
import { IBaseRepository } from '@app/shared/base.repository.interface';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository extends IBaseRepository<User> {
  createUser(user: User): Promise<User>;
  updateUser(id: number, user: User): Promise<boolean>;
  getUserByUsername(username: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  getUserById(id: number): Promise<User>;
  deleteUser(id: number): Promise<boolean>;
  restoreUser(id: number): Promise<boolean>;
  isUsernameExists(username: string): Promise<boolean>;
  isEmailExists(email: string): Promise<boolean>;
  isIdExists(id: number): Promise<boolean>;
}
