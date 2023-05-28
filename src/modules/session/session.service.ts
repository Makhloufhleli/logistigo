import { Session } from '@app/entities/Session';
import {
  ISessionsRepository,
  SESSION_REPOSITORY,
} from '@app/modules/session/session.repository.interface';
import { ISessionService } from '@app/modules/session/session.service.interface';
import { BaseService } from '@app/shared/base.service';
import { Inject } from '@nestjs/common';

export class SessionService extends BaseService<Session> implements ISessionService {
  constructor(@Inject(SESSION_REPOSITORY) private readonly sessionRepository: ISessionsRepository) {
    super(sessionRepository);
  }

  async createSession(session: Session): Promise<Session> {
    try {
      return await this.sessionRepository.createSession(session);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
  async updateSession(id: number, refreshToken: string): Promise<Session> {
    try {
      return await this.sessionRepository.updateSession(id, refreshToken);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
  async getSessionByUserIdAndUserAgent(userId: number, userAgent: string): Promise<Session> {
    try {
      return await this.sessionRepository.getSessionByUserIdAndUserAgent(userId, userAgent);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
  async expireSession(id: number): Promise<boolean> {
    try {
      return await this.sessionRepository.expireSession(id);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
  async isAlreadyHaveSession(userId: number, userAgent: string): Promise<boolean> {
    try {
      return await this.sessionRepository.isAlreadyHaveSession(userId, userAgent);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  async isValidSession(userId: number, userAgent: string): Promise<boolean> {
    try {
      return await this.sessionRepository.isValidSession(userId, userAgent);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  async expireSessionByUserAgent(userId: number, userAgent: string): Promise<boolean> {
    try {
      return await this.sessionRepository.expireSessionByUserAgent(userId, userAgent);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  async expireSessionById(idSession: number): Promise<boolean> {
    try {
      return await this.sessionRepository.expireSessionById(idSession);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
