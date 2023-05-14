import { User } from '@app/entities/User';

export const SEEDER_SERVICE = 'SEEDER_SERVICE';

export interface ISeederService {
  seedSuperAdmin(admin: User): Promise<User>;
}
