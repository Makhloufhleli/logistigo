import { User } from '@app/entities';
import { CreateUserDto } from '@app/modules/user/dto/user.create.dto';
export const USERS_SERVICE = 'USERS_SERVICE';
export interface IUserService {
  createUserFromDto(createUserDto: CreateUserDto): Promise<User>;
  createUser(user: User): Promise<User>;
  getUserById(id: number): Promise<User>;
}
