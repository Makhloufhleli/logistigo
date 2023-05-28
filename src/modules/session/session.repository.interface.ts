import { Session } from '@app/entities/Session';
import { IBaseRepository } from '@app/shared/base.repository.interface';

export const SESSION_REPOSITORY = Symbol('SESSION_REPOSITORY');

export interface ISessionsRepository extends IBaseRepository<Session> {
  createSession(session: Session): Promise<Session>;
  updateSession(id: number, refreshToken: string): Promise<Session>;
  getSessionByUserIdAndUserAgent(userId: number, userAgent: string): Promise<Session>;
  expireSession(id: number): Promise<boolean>;
  isAlreadyHaveSession(userId: number, userAgent: string): Promise<boolean>;
  isValidSession(userId: number, userAgent: string): Promise<boolean>;
  expireSessionByUserAgent(userId: number, userAgent: string): Promise<boolean>;
  expireSessionById(idSession: number): Promise<boolean>;
}
