import { User } from '@app/entities/User';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUsersRepository {
  createUser(user: User): Promise<User>;
  isEmailExists(email: string): Promise<boolean>;
  isUsernameExists(username: string): Promise<boolean>;
  getUserById(id: number): Promise<User>;
}
