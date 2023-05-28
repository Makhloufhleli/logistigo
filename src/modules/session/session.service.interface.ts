import { Session } from '@app/entities';
import { IBaseService } from '@app/shared/base.service.interface';

export const SESSION_SERVICE = Symbol('SESSION_SERVICE');
export interface ISessionService extends IBaseService<Session> {
  createSession(session: Session): Promise<Session>;
  updateSession(id: number, refreshToken: string): Promise<Session>;
  getSessionByUserIdAndUserAgent(userId: number, userAgent: string): Promise<Session>;
  expireSession(id: number): Promise<boolean>;
  isAlreadyHaveSession(userId: number, userAgent: string): Promise<boolean>;
  isValidSession(userId: number, userAgent: string): Promise<boolean>;
  expireSessionByUserAgent(userId: number, userAgent: string): Promise<boolean>;
  expireSessionById(idSession: number): Promise<boolean>;
}
