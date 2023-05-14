import type { User } from '@app/entities/User';

export const RECEIVER_SERVICE = 'RECEIVER_SERVICE';
export interface IReceiverService {
  receiveSuperAdminData(): Promise<User>;
}
