import { User } from '@app/entities';
import { IBaseService } from '@app/shared/base.service.interface';

export const USER_SERVICE = Symbol('USER_SERVICE');
export interface IUserService extends IBaseService<User> {
  createUser(user: User): Promise<User>;
  updateUser(id: number, user: User): Promise<User>;
  getUserByUsername(username: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  getUserById(id: number): Promise<User>;
  deleteUser(id: number): Promise<boolean>;
  restoreUser(id: number): Promise<boolean>;
  isUsernameExists(username: string): Promise<boolean>;
  isEmailExists(email: string): Promise<boolean>;
  isIdExists(id: number): Promise<boolean>;
}
